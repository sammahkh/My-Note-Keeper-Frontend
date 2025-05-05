import React from "react";
import Header from "./components/Header/Header";
import NotesList from "./components/NotesList/NotesList";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);

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
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <NotesList notes={notes} handleDeleteNote={deleteNote} />
      </div>
    </div>
  );
};

export default App;
