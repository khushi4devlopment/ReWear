import Message from '../models/Message.js';
import Swap from '../models/SwapRequest.js';

const loadSwapFor = async (req, res) => {
  const swap = await Swap.findById(req.params.swapId);
  if (!swap) { res.status(404).json({message: 'Swap not found'}); return null; }
  if (![String(swap.requester), String(swap.owner)].includes(String(req.user._id))) {
    res.status(403).json({message: 'Not allowed'}); return null;
  }
  return swap;
};

export const messages = async (req, res) => {
  const swap = await loadSwapFor(req, res);
  if (!swap) return;
  const items = await Message.find({swapRequest: swap._id}).populate('sender', 'name').sort({createdAt: 1});
  res.json({items});
};

export const send = async (req, res) => {
  const swap = await loadSwapFor(req, res);
  if (!swap) return;
  if (!req.body.text?.trim()) return res.status(400).json({message: 'Message is required'});
  const msg = await Message.create({swapRequest: swap._id, sender: req.user._id, text: req.body.text.trim()});
  // key is `item`, not `message` — `message` is the error-shape key used everywhere else
  res.status(201).json({item: await msg.populate('sender', 'name')});
};
