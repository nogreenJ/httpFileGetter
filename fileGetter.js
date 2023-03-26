'use strict'  
const express = require('express')  
const superagent = require('superagent')  
const app = express()
var http = require('http');
var fs = require('fs');
var sharedDir = '/sharedFiles'

app.get('/', function (req, res) {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  })


app.get('/dir', function getDivContent(path){
    //if(!path) path = '';
    var files = fs.readdirSync(sharedDir /*+ path*/);
    res.send(files);
})
/*app.post('/dir', sendWeatherOfRandomCity)
app.delete('/dir', sendWeatherOfRandomCity)
app.get('/file', sendWeatherOfRandomCity)
app.post('/file', sendWeatherOfRandomCity)
app.delete('/file', sendWeatherOfRandomCity)*/


/*http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(3030);*/
  
app.listen(3030);