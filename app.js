const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const {API_VERSION}=require("./constants.js");

const app= express();

//Import routings
const authRoutes=require("./router/auth");
const userRoutes=require("./router/user");
const menuRoutes=require("./router/menu");
const courseRoutes=require("./router/course");
const postRoutes=require("./router/post")
const newsletterRoutes=require("./router/newsletter");
const rutasRoutes=require("./router/rutas");
//Configure Body Parse

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Configure static folder

app.use(express.static("uploads"));


//Configure Header HTTP - CORS
app.use(cors());



//Configure routings 
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,courseRoutes);
app.use(`/api/${API_VERSION}`,postRoutes);
app.use(`/api/${API_VERSION}`,newsletterRoutes);
app.use(`/api/${API_VERSION}`,rutasRoutes);

module.exports=app;