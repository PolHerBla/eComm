const { error } = require("node:console");
const model = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { response } = require("express");
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

exports.getProductTypes = async (req,res) => {
  try {
    const productTypes = await model.getProductTypes();

    res.json({ productTypes });

  } catch (err) {
    res.status(500).json({error: 'Error al encontrar tipos de productos'});
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await model.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: "Error al encontrar usuario" });
  }
};

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await model.getArtists();
    res.json({ artists });
  } catch (error) {
    res.status(500).json({error: "Error al conseguir artistas", details: error.message})
  }
}

exports.getProductsByArtist = async (req, res) => {
  try {
    const products = await model.getProductsByArtist(req.params.id);
    if(!products) {
      return res.status(404).json({message: "Productos no encontrados"});
    }
    res.json({ products });
  } catch (error) {
    res.status(500).json({error: "Error al encontrar productos", details: error.message})
  }
}

exports.createProduct = async (req, res) => {

  try {
    const response = await model.createProduct(req.body);
    if (response.affectedRows = 0) {
      return res.status(404).json({mesasge: 'No se ha creado el usuario'})
    }
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const response = await model.updateProduct(req.params.id, req.body);
    if ((response.affectedRows = 0)) {
      return res.status(404).json({ message: "Error al encontrar producto" });
    }
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const response = await model.deleteProduct(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encotrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
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

exports.verifySession = async (req, res) => {
  res.status(200).json({message: 'Sesión iniciada correctamente'});
};
