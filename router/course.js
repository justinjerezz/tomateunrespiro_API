const express=require("express");
const multiparty=require("connect-multiparty");
const md_auth=require("../middleware/authenticated");
const CourserController=require("../controllers/course");

const md_upload=multiparty({uploadDir:"./uploads/course"});
const api=express.Router();


api.post("/course",[md_auth,md_upload],CourserController.createCourse);
api.get("/course",CourserController.getCourse);
api.patch("/course/:id",[md_auth,md_upload],CourserController.updateCourse);
api.delete("/course/:id",[md_auth],CourserController.deleteCourse);

module.exports=api;