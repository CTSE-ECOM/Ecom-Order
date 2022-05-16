const router=require("express").Router();
const path = require('path');
const { addOrder, getall, updateOrder, deleteById, getOrderbyid } = require("../controllers/order-controller");
//const Product = require('../models/product');


 

router.post('/addOrder/create',addOrder);
router.get('/getorder/viewall',getall);
router.put('/order/edit/:_id',updateOrder);
router.delete('/orderdelete/del/:_id',deleteById);
router.get('/order/:OrderID',getOrderbyid);
// router.post('/studentforclass/sech',getstudentbygroupid);

module.exports = router;  