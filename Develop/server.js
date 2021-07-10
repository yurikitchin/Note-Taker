//Declare dependancies
const { json } = require('express');
const express = require('express')
const fs = require("fs");
const path = require('path');
const app = express()
const PORT = 3001;
const util = require('util')
const readFile = util.promisify(fs.readFile)

//add static files. this allows express to serve your static files such as CSS and javascript
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.get('/', (req, res) => res.sendFile('./public/index.html', { root: __dirname } ));

app.get('/notes', (req, res) => res.sendFile('./public/notes.html', { root: __dirname } ));

//get api router response from client side
app.get('/api/notes', async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let notes = await readFile('./db/db.json');
    notes = JSON.parse(notes)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", notes)
    return res.json(notes)
})

//begins server listening on designated port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))