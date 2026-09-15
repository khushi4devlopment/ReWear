import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import rateLimit from 'express-rate-limit'; import path from 'path'; import {fileURLToPath} from 'url'; import {connectDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js';import listingRoutes from './routes/listingRoutes.js';import swapRoutes from './routes/swapRoutes.js';import messageRoutes from './routes/messageRoutes.js';import adminRoutes from './routes/adminRoutes.js';
const __dirname=path.dirname(fileURLToPath(import.meta.url)); const app=express();
app.use(helmet({crossOriginResourcePolicy:false}));app.use(cors({origin:process.env.CLIENT_URL?.split(',')||'http://localhost:5173'}));app.use(express.json({limit:'1mb'}));app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:100}),authRoutes);app.use('/api/listings',listingRoutes);app.use('/api/swaps',swapRoutes);app.use('/api/messages',messageRoutes);app.use('/api/admin',adminRoutes);
app.get('/api/health',(_,res)=>res.json({ok:true,service:'ReWear API'}));
app.use('/api',(req,res)=>res.status(404).json({message:'Endpoint not found'}));
app.use((err,req,res,next)=>{
  console.error(err);
  // multer surfaces its own error class for size/count limits
  const status = err.status || (err.name === 'MulterError' ? 400 : 500);
  res.status(status).json({message: status === 500 ? 'Server error' : (err.message || 'Request failed')});
});
const port=process.env.PORT||5000;connectDB().then(()=>app.listen(port,()=>console.log(`API running on http://localhost:${port}`))).catch(e=>{console.error(e);process.exit(1)});
