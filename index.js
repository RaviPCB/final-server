const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://user1234:user1234@cluster0-shard-00-00.djntz.mongodb.net:27017,cluster0-shard-00-01.djntz.mongodb.net:27017,cluster0-shard-00-02.djntz.mongodb.net:27017/appDatabase?ssl=true&replicaSet=atlas-k281at-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
  console.log("db connected successfully");
});
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error : ${err.message}`);
});

app.use(morgan("dev"));
app.use(bodyParser.json());

const router = require('./routes/routes.js');
app.use('/',router);

app.listen(PORT,()=>{
    console.log('server running');
})