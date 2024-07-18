const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

router.get("/me", AuthMiddleware, AuthController.me)
module.exports = router;
