const Newsletter = require("../models/newsletter");
const mailer = require("../utils/mailer");

function suscribeEmail(req, res) {
  const { email } = req.body;

  const newsletter = new Newsletter({
    email: email.toLowerCase().trim(),
  });

  newsletter.save(async (error, newsletter) => {
    if (error) {
      res.status(400).send({ msg: "El email ya esta registrado" });
    } else {
      res.status(200).send({ msg: "Email registrado" });
      try {
        await mailer.transporter.sendMail({
          from: '"Tomate Un Respiro" <tomateunrespiro.app@gmail.com>', // sender address
          to: newsletter.email.trim(), // list of receivers
          subject: "¡Te has suscrito Tomate Un Respiro!", // Subject line
          html: `<h4>Hola, la suscribción ha sido correcta, a partir de ahora contamos con tu correo 
          en nuestra base de datos para informate sobre cualquier novedad.</h4>`, // html body
        });
      } catch (error) {
        console.log("ERROR MAIL:", error);
      }
    }
  });
}

function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Newsletter.paginate({}, options, (error, emailsStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los emails" });
    } else {
      res.status(200).send(emailsStored);
    }
  });
}

function deleteEmails(req, res) {
  const { id } = req.params;
  Newsletter.findOneAndDelete({ _id: id }, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el email" });
    } else {
      res.status(200).send({ msg: "El email ha sido eliminado" });
    }
  });
}

module.exports = {
  suscribeEmail,
  getEmails,
  deleteEmails,
};
