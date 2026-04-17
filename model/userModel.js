const db = require("../config/db");

const models = {
  getAll: async () => {
    const [results] = await db.query("SELECT * FROM users");
    return results;
  },
  getUserById: async (id) => {
    const [results] = await db.query("SELECT * FROM users WHERE usr_id = ?", [
      id,
    ]);
    return results[0];
  },
  createUser: async (userData) => {
    const [result] = await db.query(
      "INSERT INTO users (nombre , apellido1, apellido2, email) VALUES (?, ?, ?, ?)",
      [userData.nombre, userData.apellido1, userData.apellido2, userData.email],
    );
    return result;
  },
  updateUser: async (id, userData) => {
    const [result] = await db.query(
      "UPDATE users SET nombre = ? WHERE usr_id = ?",
      [userData.nombre, id],
    );
    return result;
  },
  deleteUser: async (id) => {
    const result = await db.query("DELETE FROM users WHERE usr_id = ?", [id]);
    return result;
  },
  // Ruta per conseguir email, útil per validar el usuari que es conecta
  getUserByCredentials: async (email, password) => {
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    return result[0];
  },
};

module.exports = models;
