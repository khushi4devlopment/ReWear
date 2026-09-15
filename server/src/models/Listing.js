import mongoose from 'mongoose';
const listingSchema = new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  title:{type:String,required:true,trim:true,maxlength:100},
  description:{type:String,required:true,trim:true,maxlength:1000},
  category:{type:String,enum:['Dresses','Tops','Bottoms','Jackets','Ethnic Wear','Shoes','Accessories'],required:true},
  size:{type:String,required:true},
  brand:{type:String,required:true,trim:true},
  condition:{type:String,enum:['Like New','Excellent','Good','Fair'],required:true},
  estimatedValue:{type:Number,min:0,max:100000,required:true},
  location:{type:String,required:true,trim:true},
  images:[String],
  status:{type:String,enum:['available','reserved','swapped','hidden'],default:'available'},
  views:{type:Number,default:0}
},{timestamps:true});
listingSchema.index({title:'text',brand:'text',description:'text',location:'text'});
export default mongoose.model('Listing',listingSchema);
