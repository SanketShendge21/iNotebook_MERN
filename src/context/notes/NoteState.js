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

  const notesInitial = [{
    "_id":"654a0808830d91d84f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d91d54f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d981d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d491d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d91d4f11f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d91d42f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
]

  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = (title,description,tag) =>{
    // TODO API call
    console.log("adding a new note");
    const note = {
      "_id":"654a080881230d91d4f1f13bxyz1bb",
      "user": "65426565471e862fd168d56f",
      "title": title,
      "description": description,
      "tag": tag,
      "date":  "2023-11-07T09:50:36.580Z",
      "__v": 0,
    }
    setNotes(notes.concat(note)) // concat returns an array whereas push updates an array
  }

  // Delete a note
  const deleteNote = (id) =>{
    console.log("Delete a note" + id);
    const newNotes = notes.filter((note) =>{ return note._id !== id}) // If the note id is not in the notes array then remove it from the notes array
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = (id,title,description,tag) =>{
    
  }

  return (
    //passed state in value and it will fetch all the childern component wherever we call the context api
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
