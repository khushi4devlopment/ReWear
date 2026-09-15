import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const protect=async(req,res,next)=>{
  try{
    const token=req.headers.authorization?.startsWith('Bearer ')?req.headers.authorization.slice(7):null;
    if(!token)return res.status(401).json({message:'Authentication required'});
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    if(!user||!user.isActive)return res.status(401).json({message:'Account unavailable'});
    req.user=user; next();
  }catch(e){return res.status(401).json({message:'Invalid or expired token'});}
};
export const adminOnly=(req,res,next)=>req.user?.role==='admin'?next():res.status(403).json({message:'Admin access required'});
