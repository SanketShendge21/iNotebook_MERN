
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import Noteitem from "./Noteitem.js";

function Notes() {
    const context = useContext(NoteContext); // importing context
    const {notes,setNotes} = context;
  return (
    <div className="row my-3">
    <h2>Your Notes</h2>
    {/* Fetching all notes using map function */}
    {notes.map((note) =>{
      return <Noteitem note={note}/>
    })}
    </div>
  )
}

export default Notes