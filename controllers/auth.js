const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");
const mailer=require("../utils/mailer");

  function register(req, res) {
  const { name, surnames, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    name,
    surnames,
    email: email.toLowerCase(),
    role: "user",
    active: true,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save(async (error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "El usuario ya existe" });
    } else {
      res.status(200).send(userStorage);

      try {
        
        await mailer.transporter.sendMail({
          from: '"Tomate Un Respiro" <tomateunrespiro.app@gmail.com>', // sender address
          to: userStorage.email.trim(), // list of receivers
          subject: "Bienvenid@", // Subject line
          html: `<p>Bienvenid@ a la app ${userStorage.name} ${userStorage.surnames}</p>`, // html body
        });
      } catch (error) {
        console.log("ERROR MAIL:" ,error);
      }
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El correo es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

   const emailLowerCase = email.toLowerCase();


  User.findOne({ email: emailLowerCase }).then((userStore)=> {
    if (userStore == null) {
      res.status(500).send({ msg: "No existe el usuario" });
    } else {
     bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no activo" });
        } else {
          res.status(200).send({
            idUser:userStore._id,
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    }
  });
 }

function refreshAccessToken(req, res) {
  const { token } = req.body;
  if (!token) res.status(400).send({ msg: "Token Requerido" });

  const { user_id } = jwt.decoded(token);

  User.findOne({_id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    }
  });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
