const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const users = await User.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await User.countDocuments(query);

  // res.json({
  //   total,
  //   users,
  // });

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    users,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new User({
    nombre,
    correo,
    password,
    rol,
  });

  // Encriptar la contrasenia
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar la contrasenia
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json({
    user,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    user,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};