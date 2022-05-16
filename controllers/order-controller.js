//const router = express.Router();
const Order = require('../models/order-model');

 const nodemailer = require("nodemailer");


exports.addOrder = (req, res) => {

    // res.status(200).json({file: req.files , body:req.body});
    const {
      OrderID,billAmount, deliveryAddress,  deliveryFee,deliveryStatus
    } = req.body;
    const order = new Order({
      OrderID,
        billAmount, 
        deliveryAddress,  
        deliveryFee,
        deliveryStatus
      
        // createBy: req.user._id
    });

    order.save(((error, Order) => {
        if (error)
        {
            console.log(email);
        const receiverEmail = email; // get the reciver email address from body of the  request
        const senderMail = "edexonlineconferencemanagement@gmail.com"; // set emailmaddress of sender
        const password = "asdqwe@123"; // set password of sender

        try {
            /*
           create reusable transporter object using the default SMTP transport
          */
            let transporter = nodemailer.createTransport({
                service: "gmail", // use gmail as the email service
                port: 25, // port number
                secure: false, // true for 465, false for other ports
                auth: {
                    // autnetication details
                    user: senderMail,
                    pass: password,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
    
            let HelperOptions = {
                from: senderMail, // sender address
                to: receiverEmail, // list of receivers
                subject: "Welcome to Sipni higher education.You have successfully registerd to the class Group ", // Subject line
                text: "", // plain text body
                html: ` 
                      <h3>This is an automatically generated email, please do not reply </h3>
                      <li>You successfully registerd to system </li>
                      <li>status: Successuly  </li>
                      <li>StudentId: ${StudentGroupId}</li>
                      <li>class: ${Studentclass}</li>
                     
                      
                      <h3>Best regards,</h3>
                      <p>Sipni Higher Education center</p>`,
            };
    
            // HTML version of the message
    
            transporter.sendMail(HelperOptions, (error, info) => {
                // send mail with defined transport object
                if (error) {
                    return console.log(error);
                }
    
                console.log("The message was sent!");
    
                console.log(info);
    
                res.json(info); // send the json response
            });
        } catch (e) {
            console.log(e);
        }
        }
        if (Order) {
            res.status(201).json({ Order });
        }
    }));
    //hhh
};


exports.getall=async(req,res)=>{
    await Order.find({})
    .then(data=>{
       res.status(200).send({data:data});
   }).catch(err=>{
       res.status(500).send({error:err.massage})
       console.log(err);
   });
  
           
   }

   exports.getOrders = (req, res) => {
    Order.find({}).exec((error, orders) => {
        if (error) return res.status(400).json({ error });
        if (orders) {
            const orderList = createOrder(orders)
            return res.status(201).json({ orderList });
        }
    });
}
exports.updateOrder = (req, res) => {

    const {
         billAmount,deliveryAddress,deliveryFee,deliveryStatus
    } = req.body;
  
    console.log(" id", req.params._id)

    Order.findByIdAndUpdate(req.params._id, { $set: {  billAmount:billAmount ,deliveryAddress: deliveryAddress, deliveryFee: deliveryFee,deliveryStatus:deliveryStatus} },
        { new: true })
        .catch((err) => {
            console.log(err);
        })
}
exports.deleteById = (req, res) => {
    const { OrderID } = req.params._id;
    console.log(req.params._id)
    if (req.params._id) {
        Order.deleteOne({ _id: req.params._id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    } else {
      res.status(400).json({ error: "Params required" });
    }
  };

exports.getOrderbyid=async(req,res)=>{
    if(req.params && req.params.OrderID){
        console.log(req.params.OrderID)
        //console.log(req.params);
        await  Order.findById(req.params.OrderID)
        .then(data => {
            console.log(data);
           res.status(200).send({ data: data });
           //console.log(subjects);
       }).catch(err=>{
           res.status(400).send({error:err.massage})
       });
    }
    
  };
  // exports.getstudentbygroupid=async(req,res)=>{
  //   const StudentGroupId= req.body.StudentGroupId;
  //   //const feesId=
    
  //       console.log("xxx"+StudentGroupId)
  //       //console.log(req.params);
  //       await  Studentforclass.findOne({StudentGroupId:StudentGroupId})
  //       .then(data => {
  //           console.log(data);
  //          res.status(200).send({ data: data });
  //          //console.log(subjects);
  //      }).catch(err=>{
  //          res.status(400).send({error:err.massage})
  //      });
    
    
  // }
// const CustomerModel = require("../models/order-model");
// const OrderModel = require("../models/order-model");



// //fetch orders placed by a specific customer
// exports.getOrders = async (req, res, next) => {
//   let orders;

//   try {
//     orders = await OrderModel.find(
//       { buyerID: req.user._id },
//       "_id billAmount deliveryAddress deliveryStatus orderData"
//     );

//     res.status(200).send({ orders: orders });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       desc: "Internal Server Error",
//     });
//   }
// };


// //add order
// exports.addOrder = async (req, res) => {
//   const buyerID = req.user._id;
//   let address = req.user.address;

//   const { billAmount, deliveryAddress, status, orderData } = req.body;

//   if (req.body.deliveryAddress) {
//     address = deliveryAddress;
//   }

//   const deliveryStatus = {
//     status: status,
//   };

//   try {
//     const newDelOrder = await OrderModel.create({
//       orderID,
//       billAmount,
//       deliveryAddress: address,
//       deliveryStatus,
//       orderData,
//     });

    
//   } catch (error) {
//     res.status(500).send({
//       status: "Internal Server Error in new order create",
//       error: error.message,
//     });
//   }
// };


