const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router.get("/", controller.getAll);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;