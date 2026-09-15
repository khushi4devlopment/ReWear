import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true,maxlength:60},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true,minlength:6},
  phone:{type:String,trim:true},
  location:{type:String,trim:true},
  bio:{type:String,maxlength:300,default:''},
  avatar:{type:String,default:''},
  role:{type:String,enum:['user','admin'],default:'user'},
  isActive:{type:Boolean,default:true}
},{timestamps:true});
userSchema.methods.toSafeJSON=function(){const o=this.toObject(); delete o.password; delete o.__v; return o;};
export default mongoose.model('User',userSchema);
