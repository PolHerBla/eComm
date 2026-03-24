const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const jwt = require("../middleware/webToken");

router.post("/login", controller.login);

router.get("/", jwt, controller.getAll);
router.get("/:id", jwt,controller.getUserById);
router.post("/", jwt, controller.createUser);
router.put("/:id", jwt, controller.updateUser);
router.delete("/:id", jwt, controller.deleteUser);

module.exports = router;