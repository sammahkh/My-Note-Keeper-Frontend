import Note from "./Note";
import "./NotesList.css";

const NotesList = ({ notes, handleDeleteClick }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          creationDate={note.creationDate}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default NotesList;
