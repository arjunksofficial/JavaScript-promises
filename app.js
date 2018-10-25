var express = require('express');
var app = express();
var apiController = require('./controllers/apiController');



app.use('/public', express.static(__dirname + '/public'));

apiController(app);

app.listen(5000);
