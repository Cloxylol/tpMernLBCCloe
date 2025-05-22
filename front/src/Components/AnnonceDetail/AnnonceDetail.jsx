import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnnonceDetail = () => {
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);

    useEffect(() => {
        const fetchAnnonce = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/annonces/${id}`);
                setAnnonce(res.data);
            } catch (error) {
                console.error("Erreur de chargement de l'annonce", error);
            }
        };

        fetchAnnonce();
    }, [id]);

    if (!annonce) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{annonce.title}</h1>
            <p><strong>Description :</strong> {annonce.description}</p>
            <p><strong>Catégorie :</strong> {annonce.category}</p>
            <p><strong>Auteur :</strong> {annonce.author?.prenom} {annonce.author?.nom}</p>
        </div>
    );
};

export default AnnonceDetail;
