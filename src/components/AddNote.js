import React, { useState } from "react";
import NoteContext from "../context/notes/NoteContext.js";
import { useContext } from "react";

const AddNote = (props) => {
    const context = useContext(NoteContext); // importing context
    const { addNote } = context;

    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault() // no page reload
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note added","success");
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
            value={note.title}
            onChange={onChange}
            minLength={5}  
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
            value={note.description}
            onChange={onChange}
            minLength={5}
          />

        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />

        </div>
       
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
