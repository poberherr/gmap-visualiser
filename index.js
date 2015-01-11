var express = require('express');
var app = express();
var path = require('path');

// Here we set the folder what servers as the main root folder
// for our URL
// "public" off of current is root
app.use(express.static(path.join(__dirname, 'public')));

port = 3000;
app.listen(port);
console.log('Listening on port ' + port);
