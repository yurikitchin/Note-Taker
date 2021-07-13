//Declare dependancies
const { json } = require("express");
const express = require("express");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { nanoid } = require('nanoid')
const path = require("path");
const app = express();
const PORT = 3001;

//add static files. this allows express to serve your static files such as CSS and javascript
app.use(express.static(path.join(__dirname, "public")));

//add body parser - parse url encoded information into a ne wbody object and converts it to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) =>
  res.sendFile("./Develop/public/index.html", { root: __dirname })
);

app.get("/notes", (req, res) =>
  res.sendFile("./Develop/public/notes.html", { root: __dirname })
);

//get api router response from client side
app.get("/api/notes", async (req, res) => {
  let notes = await readFile("./db/db.json");
  notes = JSON.parse(notes);
  return res.json(notes);
});

//saves user input and returns new db.json
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  req.body.id = nanoid()

  fs.readFile("./Develop/db/db.json", (error, data) => {
    if (error) throw error;
    let notesArray = JSON.parse(data);
    notesArray.push(newNote);

    fs.writeFile("./Develop/db/db.json", JSON.stringify(notesArray), function (err) {
      if (err) throw err;
      else {
        console.log("thew new note has been added");
        res.sendStatus(200);
      }
    });
  });
});

//Deletes selected note
app.delete('/api/notes/:id', (req, res) => {
  console.log("Delete request called")

  let deleteID = req.params.id
    //reads db.json then filters out the note to delete using the nano id
  fs.readFile("./db/db.json", (error, data) => {
    if (error) throw error;
    let notesArray = JSON.parse(data);
    const newArray = notesArray.filter((note) => note.id !== deleteID)

    fs.writeFile("./db/db.json", JSON.stringify(newArray), function (err) {
        if (err) throw err;
        else {
          console.log("the new note has been added");
          res.sendStatus(200);
        }
      });
    }); 
});

//begins server listening on designated port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
