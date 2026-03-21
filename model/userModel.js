const db = require("../config/db");

const models = {
  getAll: async () => {
    const [results] = await db.query("SELECT * FROM users");
    return results;
  },
  getUserById: async (id) => {
    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return results[0];
  },
  createUser: async (userData) => {
    const [result] = await db.query(
      "INSERT INTO users (id, nombre) VALUES (?, ?)",
      [userData.id, userData.nombre],
    );
    return result;
  },
  updateUser: async (id, userData) => {
    const [result] = await db.query(
      "UPDATE users SET nombre = ? WHERE id = ?",
      [userData.nombre, id],
    );
    return result;
  },
  deleteUser: async (id) => {
    const result = await db.query("DELETE FROM users WHERE id = ?", id);
    return result;
  },
};

module.exports = models;
