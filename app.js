// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express()

// Tells express where my frontend code is.
const PORT = process.env.PORT || 9001;

// Serving static filein express.
app.use(express.static("public"));


// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// Read the file on load.
let notes = JSON.parse(fs.readFileSync('./db/db.json'));

// API route - GET all notes (JSON)
app.get("/api/notes", (req, res) => res.json(notes));


// Displays a single note, or returns false.
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < notes.length; i++) {
    if (id === notes[i].id) {
      return res.json(notes[i]);
    }
  }
  return res.json(false);
});


// Updating the notes arry on memory and then writing it to (JSON).
app.post("/api/notes", (req, res) => {
  const note = req.body;
  const dateid = Date.now()
  note.id = dateid.toString();
  notes.push(note);
  res.json(note);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));
});

// Deleting the notes arry from memory when clicked and removing it from (JSON).
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((item) => item.id !== id);
  res.json(notes);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));
});


// Starts express server.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

