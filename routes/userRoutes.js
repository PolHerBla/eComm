const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const jwt = require("../middleware/webToken");

router.post("/login", controller.login);

router.get("/productos", jwt, controller.getAllProducts);
router.get("/productos/:id", jwt, controller.getProductById);
router.get("/tipoProducto/:id", jwt, controller.getProductTypeById);
// router.post("/", jwt, controller.createUser);
// router.put("/:id", jwt, controller.updateUser);
// router.delete("/:id", jwt, controller.deleteUser);

module.exports = router;
