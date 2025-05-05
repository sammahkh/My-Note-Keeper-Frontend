import React, { useState } from "react";
import "./AddEditNoteModal.css";

const AddEditNoteModal = ({
  mode = "add",
  onClose,
  onSubmit,
  initialTitle = "",
  initialContent = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (!title || !content) return;
    onSubmit(title, content);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "add" ? "Add Note" : "Edit Note"}</h2>
        <input
          className="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>
          {mode === "add" ? "Add" : "Save"}
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEditNoteModal;
