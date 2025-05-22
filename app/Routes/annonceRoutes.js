const express = require("express");
const {
  createAnnonce,
  getAllAnnonces,
  deleteAnnonce,
  updateAnnonce,
  getAnnonceById,
} = require("../Controllers/annonceController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createAnnonce);
router.get("/getAllAnnonces", getAllAnnonces);
router.delete("/delete/:id", authMiddleware, deleteAnnonce);
router.put("/update/:id", authMiddleware, updateAnnonce);
router.get("/:id", getAnnonceById);

module.exports = router;
