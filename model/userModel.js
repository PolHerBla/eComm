const db = require("../config/db");

const models = {
  getAllProducts: async () => {
    const [results] = await db.query("SELECT * FROM products");
    return results;
  },
  getProductById: async (id) => {
    const [results] = await db.query("SELECT * FROM products WHERE product_id = ?", [
      id,
    ]);
    return results[0];
  },
  getProductTypeById: async(id) => {
    const [results] = await db.query("SELECT * FROM product_types WHERE type_id = ?", [id]);
    return results[0];
  }
  ,
  // createProduct: async (userData) => {
  //   const [result] = await db.query(
  //     "INSERT INTO products",
  //     [userData.nombre, userData.apellido1, userData.apellido2, userData.email],
  //   );
  //   return result;
  // },
  // updateProduct: async (id, userData) => {
  //   const [result] = await db.query(
  //     "UPDATE products SET nombre = ? WHERE usr_id = ?",
  //     [userData.nombre, id],
  //   );
  //   return result;
  // },
  // deleteProduct: async (id) => {
  //   const result = await db.query("DELETE FROM users WHERE usr_id = ?", [id]);
  //   return result;
  // },
  // Ruta per conseguir email, útil per validar el usuari que es conecta
  getUserByCredentials: async (email, password) => {
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    return result[0];
  },
  getArtists: async () => {
    const [results] = await db.query("SELECT * FROM artists;");
    return results;
  },
  getProductsByArtist: async (artist_id) => {
    const [results] = await db.query(" select p.* from artists a join products p on a.artist_id = product_artist where artist_id =  ?;", [artist_id]);
    return results;
  }
};

module.exports = models;
