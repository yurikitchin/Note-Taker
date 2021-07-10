//Declare dependancies
const express = require('express')
const fs = require("fs");
const path = require('path');
const app = express()
const PORT = 3001;

//add static files. this allows express to serve your static files such as CSS and javascript
app.use(express.static("./Develop/public"))

//Routes
app.get('/', (req, res) => res.sendFile('./public/index.html', { root: __dirname } ));

//begins server listening on designated port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))