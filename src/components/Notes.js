import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import Noteitem from "./Noteitem.js";
import AddNote from "./AddNote.js";

function Notes() {
  const context = useContext(NoteContext); // importing context
  const { notes, getNotes , editNote } = context;
  useEffect(() => {
    // Everytime component is rendered with context we need to fetch the notes
    getNotes();
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

  // Using useref
  const updateNote = (currentNote) => {
    ref.current.click(); // we have to use .current.function_name its the syntax
    // so that we can update the note with the current note value 
    setNote({ 
      id : currentNote._id,
      etitle:currentNote.title,
      edescription:currentNote.description,
      etag:currentNote.tag
    });
  };

  const handleClick = (e) =>{
    // console.log("Updating the note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag); // Update the note 
    refClose.current.click();
}

const onChange = (e) =>{
    setNote({...note,[e.target.name]:e.target.value}) // ...note : means keep the value as it is , [e.target.name]:e.target.value : append if more values are coming je pn name change hotay tyachi value set kara
}

  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Edit Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {/* Fetching all notes using map function */}
        <div className="container mx-2">
          {notes.length === 0 && ' No notes to display'}
        </div>

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
