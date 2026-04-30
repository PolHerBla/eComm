const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const jwt = require("../middleware/webToken");

router.post("/login", controller.login);

router.get("/productos", controller.getAllProducts);
router.get("/productos/:id", controller.getProductById);
router.get("/productos/artista/:id", controller.getProductsByArtist);
router.get("/product-types", controller.getProductTypes);
router.get("/artists", controller.getAllArtists);
router.post("/productos", jwt, controller.createProduct);
// router.put("/:id", jwt, controller.updateUser);
router.delete("/productos/delete/:id", jwt, controller.deleteProduct);


// Verica si el usuari te token, per tant té sessió iniciada
router.get("/verify-session", jwt, controller.verifySession);

module.exports = router;
