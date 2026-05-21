
import React, { useState, useEffect } from 'react';

export default function HeaderAdmin() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [lieu, setLieu] = useState('');
  const [nomDemandeur, setNomDemandeur] = useState('');
  const [fonction, setFonction] = useState('');
  const [creneaux, setCreneaux] = useState([]);

  // Charger les créneaux existants au chargement du composant
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cours')) || [];
    setCreneaux(saved);
  }, []);

  // Gérer l'ajout d'un nouveau créneau
  const handleAdd = (e) => {
    e.preventDefault();

    const newCreneau = {
      title,
      date,
      start,
      end,
      lieu,
      nomDemandeur,
      fonction,
    };

    const updated = [...creneaux, newCreneau];
    setCreneaux(updated);
    localStorage.setItem('cours', JSON.stringify(updated));

    // Réinitialiser les champs
    setTitle('');
    setDate('');
    setStart('');
    setEnd('');
    setLieu('');
    setNomDemandeur('');
    setFonction('');
  };

  return (
    <div className="admin-container">
      <h2>Ajouter un créneau</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={start} onChange={(e) => setStart(e.target.value)} required />
        <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} required />
        <input type="text" placeholder="Salle" value={lieu} onChange={(e) => setLieu(e.target.value)} required />
        <input type="text" placeholder="Nom du demandeur" value={nomDemandeur} onChange={(e) => setNomDemandeur(e.target.value)} required />
        <select value={fonction} onChange={(e) => setFonction(e.target.value)} required>
          <option value="">-- Fonction --</option>
          <option value="admin">Admin</option>
          <option value="professeur">Professeur</option>
          <option value="étudiant">Étudiant</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>

      <h3>Liste des créneaux programmés</h3>
      <ul>
        {creneaux.map((cr, index) => (
          <li key={index}>
            <strong>{cr.title}</strong> — {cr.date} ({cr.start} - {cr.end})<br />
            📍 {cr.lieu}<br />
            👤 Demandeur : {cr.nomDemandeur} ({cr.fonction})
          </li>
        ))}
      </ul>
    </div>
  );
}
