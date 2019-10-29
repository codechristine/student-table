const express = require('express');

const server = express();
server.use(express.static(__dirname + '/html'));

server.get('/myFirstEndpoint', function(request, response){
  response.send('this is your endpoint. Yay!');
});

server.listen(3001, function(){
  console.log('server is listneing on port 3001');
})
