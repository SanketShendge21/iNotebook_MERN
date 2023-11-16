import React, { useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import { useContext } from "react";

const AddNote = () => {
    const context = useContext(NoteContext); // importing context
    const { addNote } = context;

    const [note,setNote] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e) =>{
        e.preventDefault() // no page reload
        addNote(note.title,note.description,note.tag)
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value}) // ...note : means keep the value as it is , [e.target.name]:e.target.value : append if more values are coming je pn name change hotay tyachi value set kara
    }

  return (
    <div className="container my-3">
      <h2>Add a new note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}  
        />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />

        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
