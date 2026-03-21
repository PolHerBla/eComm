const model = require("../model/userModel");

exports.getAll = async (req, res) => {
  try {
    const users = await model.getAll();
    res.json({ users });
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
    res.status(500).json({error: 'Error al eliminar usuario'});
  }
};
