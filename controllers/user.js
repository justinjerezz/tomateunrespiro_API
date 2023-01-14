const User = require("../models/user");
const bcrypt = require("bcryptjs");
const imagen = require("../utils/image");
const user = require("../models/user");

async function getMe(req, res) {
  const { user_id } = req.user;
  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active == "") {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send({ response });
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: true });

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  if (req.files.avatar) {
    const imagePath = imagen.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
  
    if (error) {
     
      res.status(400).send({ msg: "Error al crear el usuario." });
    } else {
      res.status(201).send({ userStored });
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hasPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = imagen.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Erorr al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualización correcta" });
    }
  });
}

async function deleteUser(req, res) {
  const {id}= req.params;
  User.findByIdAndDelete(id, (error)=>{
    if(error){
      res.status(400).send({msg:"Error al eliminar el usuario"});
    }else{
      res.status(200).send({msg:"Usuario eliminado correctamente"});
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
