import Swap from '../models/SwapRequest.js';
import Listing from '../models/Listing.js';

const populate = {path: 'requestedItem offeredItem', populate: {path: 'owner', select: 'name location'}};

export const create = async (req, res) => {
  try {
    const {requestedItem, offeredItem, message} = req.body;
    if (!requestedItem || !offeredItem) return res.status(400).json({message: 'Choose both items'});
    const target = await Listing.findOne({_id: requestedItem, status: 'available'});
    const offer = await Listing.findOne({_id: offeredItem, owner: req.user._id, status: 'available'});
    if (!target || !offer) return res.status(400).json({message: 'Items must be available and the offered item must belong to you'});
    if (String(target.owner) === String(req.user._id)) return res.status(400).json({message: 'You cannot request your own item'});
    const existing = await Swap.findOne({requester: req.user._id, requestedItem, offeredItem, status: 'pending'});
    if (existing) return res.status(409).json({message: 'Swap request already exists'});
    const swap = await Swap.create({
      requester: req.user._id, owner: target.owner, requestedItem, offeredItem, message,
      requesterValue: offer.estimatedValue, ownerValue: target.estimatedValue
    });
    res.status(201).json({swap: await swap.populate(populate)});
  } catch (e) {
    res.status(400).json({message: 'Could not create swap request'});
  }
};

export const mine = async (req, res) => {
  const items = await Swap.find({$or: [{requester: req.user._id}, {owner: req.user._id}]})
    .populate('requester owner', 'name email location')
    .populate('requestedItem offeredItem')
    .sort({createdAt: -1});
  res.json({items});
};

// Transitions depend on WHO is asking, not just the current status.
// The item owner accepts/rejects; the requester can only withdraw. Either side
// can mark an accepted swap completed once the exchange has happened.
const transitions = {
  owner:     {pending: ['accepted', 'rejected'], accepted: ['completed']},
  requester: {pending: ['cancelled'],            accepted: ['completed']}
};

export const changeStatus = async (req, res) => {
  const swap = await Swap.findById(req.params.id);
  if (!swap) return res.status(404).json({message: 'Swap not found'});

  const isOwner = String(swap.owner) === String(req.user._id);
  const isRequester = String(swap.requester) === String(req.user._id);
  if (!isOwner && !isRequester) return res.status(403).json({message: 'Not allowed'});

  const {status} = req.body;
  const allowed = transitions[isOwner ? 'owner' : 'requester'][swap.status] || [];
  if (!allowed.includes(status)) return res.status(400).json({message: 'Invalid status change'});

  swap.status = status;
  if (status === 'accepted') {
    await Listing.updateMany({_id: {$in: [swap.requestedItem, swap.offeredItem]}}, {$set: {status: 'reserved'}});
  }
  if (status === 'completed') {
    await Listing.updateMany({_id: {$in: [swap.requestedItem, swap.offeredItem]}}, {$set: {status: 'swapped'}});
  }
  if (status === 'rejected' || status === 'cancelled') {
    // release the items so they can be offered again
    await Listing.updateMany({_id: {$in: [swap.requestedItem, swap.offeredItem]}, status: 'reserved'}, {$set: {status: 'available'}});
  }
  await swap.save();
  res.json({swap});
};
