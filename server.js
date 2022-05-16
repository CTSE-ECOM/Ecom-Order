const express = require('express');
const mongoose = require('mongoose');
//const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app=express();
const path = require('path');

console.log('db connected');  


const order_route = require('./routes/order-routes');

const PORT=process.env.PORT || 8065
const MONGODB_URI =  process.env.MONGODB_URI;
app.use(cors())
app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))  

// const URL=process.env.MONGODB_URL;


mongoose.connect(MONGODB_URI,{
  // useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  // useFindAndModify:false
}, (error) =>{
  if (error){
      console.log('Database Error:', error.message);
  }
});
mongoose.connection.once('open', () =>{
  console.log('db connected');
});

//routes

app.use('/api',order_route)



app.listen(PORT,()=>{
    console.log('server running')
})


