// import React, { useState } from "react";
import NoteContext from "./NoteContext"; // Importing noteContext
import { useState } from "react";
// Creating a function and inside it states to pass to the context
const NoteState = (props) => {
  // Commented but can be used for reference
  // // Created a state
  // const state1 = {
  //     "name" : "Sanket",
  //     "age" : 21
  // }

  // const update = () =>{
  //     setTimeout(() => {
  //         setState({
  //             "name" : "Sanket Changed using setState",
  //             "age"  : "22 changed using setState"
  //         })
  //     }, 1000);
  // }

  // const [state, setState] = useState(state1) // Use state for updating current state

  const host = "http://localhost:5000/";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = async (title,description,tag) =>{

    const data = { // Object created from the function parameters
      title : title,
      description : description,
      tag : tag
    }

    const url = `${host}api/notes/addnote/`; // API endpoint URL
    const response = await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZjkwOTBkMDQ1OGMwMzg4NmJkMTczIn0sImlhdCI6MTY5OTg2MDc1NH0.lKkYukvpkJZDZduIAWDE-jmjoKJ_D1s2z6PtoXA7U0I"
      },
      body: JSON.stringify(data),
    });
    const note = await response.json(); // directly save note from server
    setNotes(notes.concat(note)) // concat returns an array whereas push updates an array
    
  }

  // Fetch or Get all notes
  const getNotes = async () =>{

    const url = `${host}api/notes/fetchallnotes`; // API endpoint URL
    const response = await fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZjkwOTBkMDQ1OGMwMzg4NmJkMTczIn0sImlhdCI6MTY5OTg2MDc1NH0.lKkYukvpkJZDZduIAWDE-jmjoKJ_D1s2z6PtoXA7U0I"
      }
    });
    const data = await response.json();
    // console.log(data);

    setNotes(data.notes) // Setting notes from JSON object
  }

  // Delete a note
  const deleteNote = async (id) =>{
    
    const url = `${host}api/notes/deletenote/${id}`; // API endpoint URL
    const response = await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZjkwOTBkMDQ1OGMwMzg4NmJkMTczIn0sImlhdCI6MTY5OTg2MDc1NH0.lKkYukvpkJZDZduIAWDE-jmjoKJ_D1s2z6PtoXA7U0I"
      }
    });
    const json = await response.json();
    const newNotes = notes.filter((note) =>{ return note._id !== id}) // If the note id is not in the notes array then remove it from the notes array
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id,title,description,tag) =>{
    // APIT call
    // Fetch the notes from the API
    const data = { // Object created from the function parameters
      title : title,
      description : description,
      tag : tag
    }

    const url = `${host}api/notes/updatenote/${id}`; // API endpoint URL
    const response = await fetch(url,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZjkwOTBkMDQ1OGMwMzg4NmJkMTczIn0sImlhdCI6MTY5OTg2MDc1NH0.lKkYukvpkJZDZduIAWDE-jmjoKJ_D1s2z6PtoXA7U0I"
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    //Logic to edit the note
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if(element._id === id) { // If the notes id matches the id of the note then update the note
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  }

  return (
    //passed state in value and it will fetch all the childern component wherever we call the context api
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
