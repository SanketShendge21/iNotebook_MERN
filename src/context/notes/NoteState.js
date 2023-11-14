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
    "_id":"654a0808830d916d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a08088350d91d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a08088340d91d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a0808830d911d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"654a08088230d91d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
  {
    "_id":"6524a08088330d91d4f1f13b1b",
    "user": "65426565471e862fd168d56f",
    "title": "Hey there, Sanket 2",
    "description": "Good to go, doing a great job",
    "tag": "personal",
    "date":  "2023-11-07T09:50:36.580Z",
    "__v": 0,
  },
]

  const [notes, setNotes] = useState(notesInitial);
  return (
    //passed state in value and it will fetch all the childern component wherever we call the context api
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
