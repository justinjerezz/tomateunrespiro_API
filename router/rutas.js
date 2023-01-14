const express=require("express");
const RutasController=require("../controllers/rutas");
const md_atuh=require("../middleware/authenticated.js");
const multiparty=require("connect-multiparty");

const md_upload=multiparty({uploadDir:"./uploads/rutas"});
const api=express.Router();

api.post("/rutas",[md_atuh,md_upload],RutasController.createRuta);
api.get("/rutas",RutasController.getRutas); 
api.patch("/rutas/:id",[md_atuh,md_upload],RutasController.updateRutas); 
api.delete("/rutas/:id",md_atuh,RutasController.deleteRuta); 
api.get("/rutas/:path",RutasController.getRuta); 

module.exports=api;