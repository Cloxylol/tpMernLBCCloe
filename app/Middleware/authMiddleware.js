const jwt = require("jsonwebtoken");
const User = require("../Models/userModel"); // Assure-toi que ce chemin est bon

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // décode sans base

    const user = await User.findById(decoded._id); // vérifie en base
    if (!user) {
      return res.status(401).send({ error: "Utilisateur introuvable" });
    }

    req.user = user; // injecte le document Mongoose complet
    console.log("Utilisateur authentifié :", req.user); // debug
    next();
  } catch (error) {
    console.error("Erreur auth :", error.message);
    res.status(401).send({ error: "Veuillez vous authentifier." });
  }
};

module.exports = authMiddleware;
