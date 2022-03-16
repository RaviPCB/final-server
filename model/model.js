const mongoose = require('mongoose');

const order = new mongoose.Schema({
    clientName:String,
    clientNumber:Number,
    productDesc:String,
    status:Number,
},{timestamps:true});

module.exports = mongoose.model("orders",order);