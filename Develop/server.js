//Declare dependancies
const { json } = require('express');
const express = require('express')
const fs = require("fs");
const util = require('util')
const readFile = util.promisify(fs.readFile)
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const PORT = 3001;

//add static files. this allows express to serve your static files such as CSS and javascript
app.use(express.static(path.join(__dirname, 'public')))

//add body parser - parse url encoded information into a ne wbody object and converts it to JSON
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile('./public/index.html', { root: __dirname } ));

app.get('/notes', (req, res) => res.sendFile('./public/notes.html', { root: __dirname } ));

//get api router response from client side
app.get('/api/notes', async (req, res) => {
    let notes = await readFile('./db/db.json');
    notes = JSON.parse(notes)
    return res.json(notes)
})

app.post('/api/notes', async (req, res) => {
    const newNote = req.body
    let notes = await readFile('./db/db.json')
    notes = JSON.parse(notes)
    notes.push(newNote)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", notes)
    
   

})

//begins server listening on designated port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))