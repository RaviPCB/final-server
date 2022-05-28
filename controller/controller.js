
const cli = require("nodemon/lib/cli");
const orders = require("../model/model.js");
const client = require('twilio')('ACc68219983034f205fa43a14919ebaf19','b9dd89c77bf69bc3e57ce5462f1a503e')

exports.testing = (req, res) => {
  res.status(200).send("working");
};

exports.addOrder = async (req, res) => {
  const name = req.body.name;
  const num = req.body.number;
  const desc = req.body.desc;
  const status = req.body.status;

  const add = await orders.create({
    clientName: name,
    clientNumber: num,
    productDesc: desc,
    status: status,
  });

  res.status(200).send(add);
};

exports.getNewOrderList = async (req, res) => {
  sort = {'updatedAt': -1};
  orders
    .find({ status: 1 }, { clientName: 1, productDesc: 1, createdAt: 1,updatedAt:1,status:1 }).sort(sort)
    .then((response) => {
      res.status(200).send(response);
    });
};

exports.getongoingOrder = async (req,res)=>{
  sort = {'updatedAt': -1}
  orders.find({ status: 2 }, { clientName: 1, productDesc: 1, createdAt: 1,updatedAt:1,status:1 }).sort(sort)
    .then((response) => {
      res.status(200).send(response);
    });
}

exports.getreadyOrder = async (req,res)=>{
  sort = {'updatedAt': -1}
  orders.find({ status: 3 }, { clientName: 1, productDesc: 1, createdAt: 1,updatedAt:1,status:1 }).sort(sort)
    .then((response) => {
      res.status(200).send(response);
    });
}

exports.getdeliveredOrder = async (req,res)=>{
  sort = {'updatedAt': -1}
  orders.find({ status: 4 }, { clientName: 1, productDesc: 1, createdAt: 1,updatedAt:1,status:1 }).sort(sort)
    .then((response) => {
      res.status(200).send(response);
    });
}

exports.updateStatus = async(req,res)=>{
  const stat = req.body.status;
  const id = req.body.id;
  orders.findOneAndUpdate({_id:id},{status : stat}).then((response)=>{
    if(response){
      res.status(200).send("updated");
    }
    else
    res.status(400).send("something went wrong")
  })
}

exports.updateDetails = async(req,res)=>{
  const id=req.body.id;
  const desc = req.body.desc;
  const num = req.body.num;
  let count =0;

  if(num!=0)
  {
    await orders.findOneAndUpdate({_id:id},{clientNumber : num}).then((response)=>{
      if(response){
        count=count+1;
      }
    });
  }
  if(desc!="#")
  {
    orders.findOneAndUpdate({_id:id},{productDesc : desc}).then((response)=>{
      if(response){
        count=count+1;
      }
    });
  }
}

exports.search = async (req,res)=>{
  const num = req.body.number;
  orders.find({clientNumber:num}).sort({'updatedAt': -1}).then((response)=>{
    if(response){
      res.status(200).send(response);
    }
    else
    res.status(400).send("something went wrong");
  })
}