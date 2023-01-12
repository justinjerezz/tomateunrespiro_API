const express=require("express");
const NewsletterController=require("../controllers/newsletter.js");
const md_auth=require("../middleware/authenticated");

const api=express.Router();

api.post("/newsletter", NewsletterController.suscribeEmail);
api.get("/newsletter",md_auth,NewsletterController.getEmails);
api.delete("/newsletter/:id",md_auth,NewsletterController.deleteEmails);

module.exports=api;