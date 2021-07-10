//Declare dependancies
const express = require('express')
const fs = require("fs");
const path = require('path');
const app = express()
const PORT = 3001;

//Routes
app.get('/notes', (req, res) => res.sendFile('./Develop/public/index.html', { root: __dirname } ));

//begins server listening on designated port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))