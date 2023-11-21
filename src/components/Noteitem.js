import React from "react";
import NoteContext from "../context/notes/NoteContext.js";
import { useContext } from "react";

const Noteitem = (props) => {
  const context = useContext(NoteContext); // importing context
  const { deleteNote } = context;  // delete context.
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
            {note.description}
            </p>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i> {/*  Adding a onclick handler arrow function because we are also passing argument to the function  */}
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i> {/* update note with new value arrow function because we are also passing argument to the function*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
