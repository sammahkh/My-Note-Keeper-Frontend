import Note from "./Note";
import "./NotesList.css";
const NotesList = ({ notes, handleDeleteNote }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          creationDate={note.creationDate}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
