const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../../db_connection');

router.use(express.json());

router.delete('/', function (req, res) {

});

module.exports = router;
