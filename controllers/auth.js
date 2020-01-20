import User from '../models/user';
import jwt from 'jsonwebtoken';
import {Client} from 'authy-client';

const key = process.env.TWILIO_KEY;
const authOtp = new Client({key});

export const signup =async (req,res)=>{
  let authProcess=null;

  const {email,phone,countryCode,role} = req.body;
  let user = null;
  authOtp.registerUser({countryCode:countryCode,
    email:email,phone:phone
  }).then(async resp=>{
    user = new User({
      phone:req.body.phone,
      email:req.body.email,
      authy_id:resp.user.id,
      country_code:req.body.country_code,
      role:req.body.role
    });
    const userSaved = await user.save();

    res.status(200).json({user:userSaved});
  }).catch(error=>{
    res.status(400).json({error});
  })


}
export const log_emailSms =async (req,res)=>{

  const user = await User.findOne({email:req.body.email});
  if(!user){
    res.status(400).json({error:"not user founded"})
  }

  authOtp.requestSms({ authyId:user.authy_id,force:true})
  .then(resp=>{
    res.status(200).json({message:resp});
  }).catch((e)=>{

    res.status(400).json({"message":e})
  })

}
export const log_emailCall =async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  authOtp.requestCall({ authyId:user.authy_id})
  .then(resp=>{
    res.status(200).json({message:resp});
  }).catch((e)=>{
    res.status(400).json({"message":e});
  })

}

export const login = async(req,res)=>{
  let user=null;
  console.log(req.body.email);
  try {
    user = await User.findOne({email:req.body.email});
  } catch (e) {
    console.log(e);
    res.status(400).json({"error":"bad login"});
    return;

  }
  authOtp.verifyToken({authyId:user.authy_id,token:req.body.token})
    .then(resp=>{
      const token = jwt.sign({id:user._id},"token_test",{
        expiresIn:3600
      });
      res.status(200).json({token})
    }).catch((error)=>{
      res.status(401).json({error});
    });
}
