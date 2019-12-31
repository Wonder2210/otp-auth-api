import {Router} from 'express';


import {signup,log_emailSms,log_emailCall,login} from '../controllers/auth';

const app = Router();


app.post('/signup',signup);
app.post('/log_sms',log_emailSms);
app.post('/log_call',log_emailCall);
app.post('/login',login);

export default app;
