import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';


import authRoutes from './routes/auth';

const app = express();


mongoose.connect('mongodb://localhost/test',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex: true
}).then(db=>{
            console.log("DbConnected");
          })
    .catch(err=>{
            console.log("Error");
          });


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/auth',authRoutes);

app.listen(4000,()=>{
  console.log("running on http://localhost:4000");
});
