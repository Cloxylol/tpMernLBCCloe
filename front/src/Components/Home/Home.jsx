import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [annonces, setannonces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAnnonceId, setEditAnnonceId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newAnnonce, setNewAnnonce] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchannonces();
  }, []);

  const fetchannonces = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/annonces/getAllAnnonces"
      );
      setannonces(response.data);
    } catch (error) {
      console.error("Error fetching annonces:", error);
    }
  };

  const handleEdit = (annonce) => {
    setIsEditing(true);
    setEditAnnonceId(annonce._id);
    setNewAnnonce({
      title: annonce.title,
      description: annonce.description,
      category: annonce.category,
    });
  };

  const updateAnnonce = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/annonces/update/${editAnnonceId}`,
        newAnnonce,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      setEditAnnonceId(null);
      setNewAnnonce({ title: "", description: "", category: "" });
      fetchannonces();
    } catch (error) {
      console.error("Erreur update :", error);
    }
  };


  const deleteAnnonce = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to delete a Annonce.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/annonces/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Annonce deleted successfully");
      fetchannonces(); // refresh la liste après suppression
    } catch (error) {
      console.error("Error deleting Annonce:", error.response?.data || error.message);
    }
  };


  const createAnnonce = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to create a Annonce.");
      return;
    }

    console.log(newAnnonce);

    try {
      const response = await axios.post(
        "http://localhost:8080/annonces/create",
        newAnnonce,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Annonce created successfully");
      setannonces([...annonces, response.data]); // 
      setNewAnnonce({ title: "", description: "", category: "" });
    } catch (error) {
      console.error("Error creating Annonce:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to the Fake LeBonCoin App</h1>


      <h2>Liste des annonces</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        <option value="immobilier">Immobilier</option>
        <option value="emploi">Meuble</option>
        <option value="informatique">Informatique</option>
        <option value="loisir">Loisir</option>
      </select>
      <div>
        {annonces
          .filter((a) => selectedCategory === "" || a.category === selectedCategory)
          .map((annonce) => (
            <div key={annonce._id}>
              <h3>{annonce.title}</h3>
              <p>{annonce.description}</p>
              <p>Catégorie : {annonce.category}</p>
              <button onClick={() => deleteAnnonce(annonce._id)}>Supprimer</button>
              <button onClick={() => handleEdit(annonce)}>Modifier</button>
              <Link to={`/annonce/${annonce._id}`}>
                <button>Voir l'annonce</button>
              </Link>
            </div>
          ))}

      </div>
      <div>
        <h2>Crée une nouvelle annonce</h2>
        <input
          type="text"
          placeholder="Title"
          value={newAnnonce.title}
          onChange={(e) =>
            setNewAnnonce({ ...newAnnonce, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={newAnnonce.description}
          onChange={(e) =>
            setNewAnnonce({ ...newAnnonce, description: e.target.value })
          }
        />

        <select
          value={newAnnonce.category}
          onChange={(e) =>
            setNewAnnonce({ ...newAnnonce, category: e.target.value })
          }
        >
          <option value="">Category :</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Emploi">Meuble</option>
          <option value="Informatique">Informatique</option>
          <option value="Loisir">Loisir</option>
        </select>


        <button onClick={isEditing ? updateAnnonce : createAnnonce}>
          {isEditing ? "Mettre à jour" : "Créer l'annonce"}
        </button>
      </div>
    </div>
  );
};

export default Home;
