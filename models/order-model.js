const express = require('express');
const mongoose = require('mongoose');
const schema =mongoose.Schema;

const OrderSchema = new mongoose.Schema({
  OrderID: {
    type:String,
    required: true,
    // ref: "customers",
  },
  billAmount: {
    type: Number,
    required: true,
  },

  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: Number,
    requeird:true
  },
  deliveryStatus:
    {
      type: String,
      required:true,
    },
      
       
      
     
    },{timestamps :true})
  



const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
