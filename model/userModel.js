const db = require("../config/db");

const models = {
  getAll: async () => {
    const [results] = await db.query("SELECT * FROM alumnos");
    return results;
  },
  getUserById: async (id) => {
    const [results] = await db.query("SELECT * FROM alumnos WHERE id = ?", [id]);
    return results[0];
  },
  createUser: async (userData) => {
    const [result] = await db.query(
      "INSERT INTO alumnos (nombre , apellido1, apellido2, email) VALUES (?, ?, ?, ?)",
      [userData.nombre, userData.apellido1, userData.apellido2, userData.email],
    );
    return result;
  },
  updateUser: async (id, userData) => {
    const [result] = await db.query(
      "UPDATE alumnos SET nombre = ? WHERE id = ?",
      [userData.nombre, id],
    );
    return result;
  },
  deleteUser: async (id) => {
    const result = await db.query("DELETE FROM alumnos WHERE id = ?", id);
    return result;
  },
  // Ruta per conseguir email, útil per validar el usuari que es conecta
  getUserByEmail: async (email) => {
    const [result] = await db.query("SELECT * FROM alumnos WHERE email = ?", [email])
    return result[0];
  }
};

module.exports = models;

