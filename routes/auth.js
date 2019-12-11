const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/sign-up", authController.postSignUp);

router.post("/log-in", authController.postLogIn);

module.exports = router;
