import { useContext,useEffect } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import Noteitem from "./Noteitem.js";
import AddNote from "./AddNote.js";


function Notes() {
  const context = useContext(NoteContext); // importing context
  const { notes , getNotes } = context;
  useEffect(() =>{ // Everytime component is rendered with context we need to fetch the notes
    getNotes();
  });
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {/* Fetching all notes using map function */}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
