var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var exec = require('child_process').exec;
var execSync = require('exec-sync');


server.listen(8080);

app.get('/',
    function(req,res)
    {
        res.sendFile("/home/ricky/Analisis/Admin.html");
    }
);
