const Rutas = require("../models/rutas");
const image = require("../utils/image");

function createRuta(req, res) {
  const rutas = new Rutas(req.body);
  rutas.create_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  rutas.miniature = imagePath;
  rutas.save((error, rutasStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear la ruta" });
    } else {
      res.status(201).send(rutasStored);
    }
  });
}

function getRutas(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_at: "desc" },
  };

  Rutas.paginate({}, options, (error, rutasStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener las rutas" });
    } else {
      res.status(200).send(rutasStored);
    }
  });
}

function updateRutas(req, res) {
  const { id } = req.params;
  const rutasData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    rutasData.miniature = imagePath;
  }

  Rutas.findByIdAndUpdate({ _id: id }, rutasData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar la ruta" });
    } else {
      res
        .status(200)
        .send({ msg: "La actualización se ha realizado correctamente" });
    }
  });
}

function deleteRuta(req, res) {
  const { id } = req.params;
  Rutas.findByIdAndDelete({ _id: id }, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el ruta" });
    } else {
      res
        .status(200)
        .send({ msg: "La eliminación se ha realizado correctamente" });
    }
  });
}

function getRuta(req, res) {
  const idUser=req.params.path;
  Rutas.find({idUserCreate:idUser.toString()},(error, rutasStored) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else if (!rutasStored) {
      res.status(400).send({ msg: "La ruta no existe" });
    } else {
      res
        .status(200)
        .send(rutasStored);
    }
  });
}

module.exports = {
  createRuta,
  getRutas,
  updateRutas,
  deleteRuta,
  getRuta
};
