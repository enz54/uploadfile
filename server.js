var express = require('express');
var ejs = require('ejs');
var path = require('path');
var multer = require('multer');
var app = express();

app.set('view engine','ejs');

app.get('/api/file', function(req, res){
    res.render('index');
});

app.post('/api/file', function(req, res){
    var upload = multer({
        storage:storage
    }).single('userFile');
    upload(req, res, function(err){
        res.end('File is uploaded');
    });
});

var port = process.env.PORT || 3030
app.listen(port, function(){
    console.log('Node.js listening on port ' + port);
});

var storage = multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, 'Y:\\missingFiles')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});