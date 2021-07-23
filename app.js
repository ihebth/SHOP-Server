const bodyParser = require('body-parser');
const express=require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose=require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const app=express();
require("dotenv/config");
const api=process.env.API_URL; 
//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
/*
app.get(`${api}/products`,(req,res)=>{
   const product ={
       id:1,
       name:"hair dresser",
       image:'surl',
       
   }
    res.send(product);
})
app.post(`${api}/products`,(req,res)=>{
    const Newporduct=req.body;
    console.log(Newporduct);
     res.send(Newporduct);
 })*/
 //Database
mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log("DATABASE CONNECTION IS READY");
})
.catch((err)=>{
    console.log(err);
})
/*app.listen(3000,()=>{
    console.log(api);
    console.log("running on 3000 on http://localhost:3000/");
})*/
//Production 
var server =app.listen(process.env.PORT || 3000,function(){
    var port=server.address().port;
    console.log("express is working on port "+port)
})