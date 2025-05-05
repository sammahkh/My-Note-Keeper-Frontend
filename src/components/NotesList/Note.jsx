import { FaTrash } from "react-icons/fa";

const Note = ({ id, title, content, handleDeleteClick, creationDate }) => {
  const dateOnly = creationDate.slice(0, 10);

  return (
    <div className="note">
      <p className="note-title">{title}</p>
      <p className="note-content">{content}</p>
      <div className="note-footer">
        <small className="note-date">{dateOnly}</small>
        <FaTrash
          onClick={() => handleDeleteClick(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
