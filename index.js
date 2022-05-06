const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'))
app.get('/', (req,res)=>{
	res.sendFile(__dirname + '/views/index.html');
	// res.json('ola');
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
