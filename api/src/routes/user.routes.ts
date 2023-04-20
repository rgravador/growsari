const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/users.control");

router.post("/login", login)
router.post("/register", register)

export default router;