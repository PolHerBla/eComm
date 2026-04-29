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
  getProductTypes: async () => {
    const [results] = await db.query("SELECT * FROM product_types");
    return results;
  }
  ,
  createProduct: async (product_data) => {
    const [result] = await db.query(
      "insert into products (product_type, product_name, product_desc, product_extra_info, product_artist, product_images) values (?, ?, ?, ?, ?, ?)",
      [
        product_data.type,
        product_data.name,
        product_data.desc,
        product_data.extra,
        product_data.artist,
        product_data.image,
      ],
    );
    return result;
  },
  deleteProduct: async (id) => {
    const [result] = await db.query("DELETE FROM products WHERE product_id = ?", [id]);
    return result;
  },
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
