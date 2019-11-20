const express = require('express');
const router = express.Router();
// const mysql = require('mysql');
const db = require('../../../db_connection');

router.use(express.json());

router.get('/', function (req, res) {
  let output = null;

  const getStudentquery = " SELECT g.`id`, g.`name`, g.`grade`," +
                          "c.`course` AS`course` " +
                          "FROM `grades` AS g " +
                          "JOIN`courses` AS c " +
                          "ON c.`id` = g.`course_id` ";

    db.query(getStudentquery, (err, data) => {
    if (err) {
      output = {
        success: false,
        data: err
      };
      res.status(500);
    } else {
      // console.log(data);
      output = {
        success: true,
        data: data
      };
      res.status(200).json(output);
    }
  })
});

module.exports = router;
