const Menu = require("../models/menu.js");

async function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu.save((error, menuStored) => {
    {
      if (error) {
        res.status(400).send({ msg: "Error al crear el menu" });
      } else {
        res.status(200).send(menuStored);
      }
    }
  });
}

async function getMenus(req, res) {
  const { active } = req.query;
  let response = null;

  if (active == "") {
    response = await Menu.find().sort({order:"asc"});
  } else {
    response = await Menu.find({ active }).sort({order:"asc"});
  }

  if(!response){
    res.status(400).send({ msg:"No se ha econtrado ningun menu" });
  }else{
    res.status(200).send({ response });
    
  }
}


async function updateMenu(req, res) {
  const {id} = req.params;
  const menuData=req.body;
  Menu.findByIdAndUpdate({_id:id},menuData,(error)=>{
    if(error){
      res.status(400).send({ msg:"Error al actualizarse el menu" });
    }else{
      res.status(200).send({ msg:"Actualizacion correcta" });
    }
  })
}

async function deleteMenu(req, res) {
  const {id} = req.params;
  const menuData=req.body;
  Menu.findByIdAndDelete(id,(error)=>{
    if(error){
      res.status(400).send({ msg:"Error al eliminarse el menu" });
    }else{
      res.status(200).send({ msg:"Eliminacion correcta" });
    }
  })
}


module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu
};
