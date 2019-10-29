const express = require('express');

const server = express();
server.use(express.static(__dirname + '/html'));

const fs = require('fs');

server.get('/myFirstEndpoint', function(request, response){
  response.send('this is your endpoint. Yay!');
});

server.get('/getstudents', function(request, response){
  var data = fs.readFileSync(__dirname + '/data/studentdata.json');
  response.send(data);
})

server.listen(3001, function(){
  console.log('server is listneing on port 3001');
})
