const { response } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el email existe
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- correo",
      });
    }

    //Si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- estado: false",
      });
    }

    // Verificar la contrasenia
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -- password",
      });
    }

    // generar el JWT
    const token = await generarJWT(user.id);
    return res.json({
      user,
      token,
    });

    res.json({
      msg: "Login OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};