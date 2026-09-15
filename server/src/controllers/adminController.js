import User from '../models/User.js'; import Listing from '../models/Listing.js'; import Swap from '../models/SwapRequest.js';
export const stats=async(_,res)=>{const [users,listings,swaps,successful]=await Promise.all([User.countDocuments(),Listing.countDocuments({status:{$ne:'hidden'}}),Swap.countDocuments(),Swap.countDocuments({status:'completed'})]);res.json({users,listings,swaps,successful});};
export const users=async(_,res)=>res.json({items:await User.find().select('-password').sort({createdAt:-1})});
export const listings=async(_,res)=>res.json({items:await Listing.find().populate('owner','name email').sort({createdAt:-1})});
export const deactivateUser=async(req,res)=>{const u=await User.findById(req.params.id);if(!u)return res.status(404).json({message:'User not found'});u.isActive=!u.isActive;await u.save();res.json({message:`User ${u.isActive?'activated':'deactivated'}`});};
export const hideListing=async(req,res)=>{const i=await Listing.findById(req.params.id);if(!i)return res.status(404).json({message:'Listing not found'});i.status='hidden';await i.save();res.json({message:'Listing hidden'});};
