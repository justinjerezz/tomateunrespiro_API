const express=require("express");
const PostController=require("../controllers/post");
const md_atuh=require("../middleware/authenticated.js");
const multiparty=require("connect-multiparty");

const md_upload=multiparty({uploadDir:"./uploads/blog"});
const api=express.Router();

api.post("/post",[md_atuh,md_upload],PostController.createPost);
api.get("/post",PostController.getPosts); 
api.patch("/post/:id",[md_atuh,md_upload],PostController.updatePost); 
api.delete("/post/:id",md_atuh,PostController.deletePost); 
api.get("/post/:path",PostController.getPost); 

module.exports=api;