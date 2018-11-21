var express = require('express');

var app = express();
app.use('/a', require('./routerA').router);

app.listen(8888)
