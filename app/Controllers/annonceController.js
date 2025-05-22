const AnnonceModel = require("../Models/annonceModel");

const createAnnonce = async (req, res) => {
  try {
    const newAnnonce = new AnnonceModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.user._id,
    });

    await newAnnonce.save();
    res.status(201).send(newAnnonce);
  } catch (error) {
    console.error("Erreur création annonce :", error.message);
    res.status(400).send({ error: error.message });
  }
};

const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await AnnonceModel.find({}).populate("author", "prenom nom");
    res.status(200).send(annonces);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAnnonceById = async (req, res) => {
  try {
    const annonce = await AnnonceModel.findById(req.params.id).populate("author", "prenom nom");
    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }
    res.status(200).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const deleteAnnonce = async (req, res) => {
  try {
    console.log("Suppression annonce ID :", req.params.id);
    const deletedAnnonce = await AnnonceModel.findByIdAndDelete(req.params.id);

    if (!deletedAnnonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    res.status(200).send({ message: "Annonce supprimée", annonce: deletedAnnonce });
  } catch (error) {
    console.error("Erreur suppression annonce :", error.message);
    res.status(400).send({ error: error.message });
  }
};

const updateAnnonce = async (req, res) => {
  try {
    const updatedAnnonce = await AnnonceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAnnonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    res.status(200).send(updatedAnnonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createAnnonce,
  getAllAnnonces,
  deleteAnnonce,
  updateAnnonce,
  getAnnonceById, 
};
