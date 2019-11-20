// const http = require('http');
// const express = require('express');

// const server = express();
// server.use(express.static(__dirname + '/html'));
// server.use(express.JSON());

// const fs = require('fs');

// var newData = [
//   {
//     'id': '',
//     'name': '',
//     'course': '',
//     'grade': ''
//   }
// ]

// server.get('/api/get-student/', function (request, response) {
//   var data = fs.readFileSync(__dirname + '/data/studentdata.json');
//   response.send(data);
// });

// server.post('/addstudents', function (request, response) {
//   var rawData = fs.readFileSync(__dirname + '/data/studentdata.json', function callback(err, data){
//   newData = JSON.parse(data);
//   var newStudent = newData.push(data);
//   var json = JSON.stringify(newStudent);

//   fs.writeFileSync('/data/studentdata.json', json, callback);
//   });

//   response.send(rawData);
// });

// server.delete('/deletestudents', function (request, response) {
//   var rawData = fs.readFileSync(__dirname + '/data/studentdata.json');

//   delete newData['studentID']
//   response.send(rawData);
// });

// server.listen(3001, function () {
//   console.log('server is listneing on port 3001');
// })
