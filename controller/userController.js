const model = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts();
    res.json({ products });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al conseguir usuarios", details: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await model.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ messaje: "Usuario no encontrado" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Error al encontrar usuario" });
  }
};

exports.createUser = async (req, res) => {
  try {
    await model.createUser(req.body);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await model.updateUser(req.params.id, req.body);
    if ((response.affectedRows = 0)) {
      return res.status(404).json({ message: "Error al encontrar usuario" });
    }
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await model.deleteUser(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encotrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

exports.login = async (req, res) => {
  const user = req.body;
  try {
    const dbUser = await model.getUserByCredentials(user.email, user.password);
    if (!dbUser) {
      return res
        .status(404)
        .json({ error: "El mail no coincide con el de ningun alumno" });
    }
    const token = jwt.sign(
      { usr_id: dbUser.usr_id, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ message: "Login exitoso", token: token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesion" });
  }
};
