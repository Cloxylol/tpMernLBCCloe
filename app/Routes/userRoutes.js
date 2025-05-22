const express = require("express");
const { registerUser, loginUser } = require("../Controllers/userController");
const router = express.Router();

// TOUTES LES ROUTES DE CE FICHIER COMMENCENT PAR /users
// POST /users/register
router.post("/register", registerUser);
// POST /users/login
router.post("/login", loginUser);

module.exports = router;
