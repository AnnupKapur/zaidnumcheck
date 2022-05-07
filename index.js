const express = require('express');
const cors = require('cors');
require('dotenv').config();
var bodyParser = require("body-parser");
const handler = require('./handlers/handleIDCheck.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'))
app.get('/', (req,res)=>{
	res.sendFile(__dirname + '/views/index.html');
	// res.json('ola');
})

app.get('/:id', handler.post_idcheck);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});