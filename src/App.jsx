import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NotesList from "./components/NotesList/NotesList";
import AddEditNoteModal from "./components/AddEditNoteModal/AddEditNoteModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal/ConfirmDeleteModal";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchText, setSearchText] = useState("");
  const fetchNotes = async (searchText = "") => {
    try {
      const endpoint = searchText
        ? `https://sammahkh-my-note-keeper-backend.onrender.com/notes/search?query=${searchText}`
        : `https://sammahkh-my-note-keeper-backend.onrender.com/notes`;

      const response = await fetch(endpoint);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes(searchText);
  }, [searchText]);

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

  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const response = await fetch(
        `https://sammahkh-my-note-keeper-backend.onrender.com/notes/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
          }),
        }
      );
      const updatedNote = await response.json();
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

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

  const handleSearchChange = (text) => {
    setSearchText(text);
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

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <SearchBar handleSearchChange={handleSearchChange} />

        <NotesList
          notes={notes}
          handleDeleteClick={handleDeleteClick}
          handleNoteClick={handleNoteClick}
        />

        {showDeleteModal && (
          <ConfirmDeleteModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}

        <button
          className="add-note-btn"
          onClick={() => {
            setSelectedNote(null);
            setShowModal(true);
          }}
        >
          +
        </button>

        {showModal && (
          <AddEditNoteModal
            mode={selectedNote ? "edit" : "add"}
            note={selectedNote}
            onClose={handleCloseModal}
            onSubmit={(title, content) => {
              if (selectedNote) {
                updateNote(selectedNote._id, title, content);
              } else {
                addNote(title, content);
              }
              handleCloseModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
