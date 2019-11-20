const http = require('http');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '../html'));

const getStudentsRoute = require('./public/api/routes/get-student');
const addStudentsRoute = require('./public/api/routes/add-student');
const deleteStudentsRoute = require('./public/api/routes/delete-student');


app.use('/api/get-student/', getStudentsRoute);
app.use('/api/add-student/', addStudentsRoute);
app.use('/api/delete-student/', deleteStudentsRoute);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
