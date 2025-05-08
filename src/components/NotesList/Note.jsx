import { FaTrash } from "react-icons/fa";

const Note = ({
  id,
  title,
  content,
  handleDeleteClick,
  creationDate,
  handleNoteClick,
}) => {
  const dateOnly = creationDate.slice(0, 10);

  return (
    <div className="note" onClick={handleNoteClick}>
      <p className="note-title">{title}</p>
      <p className="note-content">{content}</p>
      <div className="note-footer">
        <small className="note-date">{dateOnly}</small>
        <FaTrash
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(id);
          }}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
