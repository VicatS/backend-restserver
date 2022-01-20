const Role = require("../models/Role");
const User = require("../models/User");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
};

const emailExiste = async (correo = "") => {
  // Verificar si existe email
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} se encuentra registrado en la DB`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si existe email
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe en la DB`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
};
