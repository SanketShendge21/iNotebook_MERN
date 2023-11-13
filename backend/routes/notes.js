const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes"); // imported mongo model of Notes
const { validate, ValidationError, Joi } = require("express-validation");

// Creating validation rules and also custom error messages
const addNote = {
  body: Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.min": "Title must be at least 3 characters long",
      "any.required": "Enter a valid title",
    }),
    description: Joi.string().min(5).required().messages({
      "string.min": "Description must be at least 5 characters long",
      "any.required": "Description is required",
    }),
    tag : Joi.string().min(3).required().messages({
        "string.min": "Tag must be at least 5 characters long"
    })
  }),
};

// ROUTE 1 : Get all the notes using : GET req to "/api/notes/fetchalluser".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json({ notes });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2 : Add a new note using : POST req to "/api/notes/addnote".Login required
router.post("/addnote", fetchuser,  validate(addNote, {}, {}), async (req, res) => {
    try {
      const { title, description, tag } = req.body; // Destructuring
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save(); // returns a note

      res.json({ savedNote });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 3 : Update the notes using : POST req to "/api/notes/updatenote" We can do a post request but we generally do put request for updation  .Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => { // taking id of logged in user so only he can update his notes
  try {
    const {title,description,tag} = req.body;
    
    //Create a new Notes Object
    const newNote = {};
    // updating the notes by taking values from user request
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id) // id from url which which we want to update
    
    if(!note){ // Send response if note does not exist
      return res.status(404).send("Note Not found")
    } 

    // Allow updation if user owns this note
    if(note.user.toString() !== req.user.id){ // extracts user id and checks with the logged in user is trying to update his note only if not then
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote}, {new:true});
    res.json({note});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
);

// ROUTE 4 : Delete an existing note using : DELETE req to "/api/notes/deletenote" .Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => { // taking id of logged in user so only he can update his notes
  try {

    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id) // id from url which which we want to update
    
    if(!note){ // Send response if note does not exist
      return res.status(404).send("Note Not found")
    } 

    // Allow deletion if user owns this note
    if(note.user.toString() !== req.user.id){ // extracts user id and checks with the logged in user is trying to update his note only if not then
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
);


// Add an error handling middleware If there are errors return bad request and the errors
router.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

module.exports = router;
