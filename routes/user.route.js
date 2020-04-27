const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user.controller");

router.post("/register", user_controller.register);
router.post("/login", user_controller.login);
router.get("/google/login", user_controller.googleAuth);
router.get("/google/callback", user_controller.googleAuthCallback);
router.get("/facebook/login", user_controller.facebookAuth);
router.get("/facebook/callback", user_controller.facebookAuthCallback);
module.exports = router;
 