import {Schema,model} from 'mongoose';
const userSchema =new Schema({
  phone:{
    type:String,
    required:true,
    min:4,
    lowercase:true
  },
  email:{
    type:String,
    unique:true,
    required:true,
    lowercase:true
  },
  authy_id:{
    type:String,
    unique:true
  }
  ,
  role:{
    type:String,
    unique:true
  },
  country_code:{
    type:String,
  }
});

export default model('User',userSchema);
