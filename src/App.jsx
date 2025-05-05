import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NotesList from "./components/NotesList/NotesList";
import AddEditNoteModal from "./components/AddEditNoteModal/AddEditNoteModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal/ConfirmDeleteModal";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        "https://sammahkh-my-note-keeper-backend.onrender.com/notes"
      );
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await fetch(
        `https://sammahkh-my-note-keeper-backend.onrender.com/notes/${id}`,
        {
          method: "DELETE",
        }
      );
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const addNote = async (title, content) => {
    try {
      const response = await fetch(
        "https://sammahkh-my-note-keeper-backend.onrender.com/notes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        }
      );
      const addedNote = await response.json();
      setNotes((prev) => [...prev, addedNote]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const handleDeleteClick = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    await deleteNote(noteToDelete);
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />

        <NotesList notes={notes} handleDeleteClick={handleDeleteClick} />

        {showDeleteModal && (
          <ConfirmDeleteModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}

        <button className="add-note-btn" onClick={() => setShowModal(true)}>
          +
        </button>

        {showModal && (
          <AddEditNoteModal
            mode="add"
            onClose={() => setShowModal(false)}
            onSubmit={addNote}
          />
        )}
      </div>
    </div>
  );
};

export default App;
