const express = require('express');
const router = express.Router();
// const mysql = require('mysql');
const db = require('../../../db_connection');

router.use(express.json());

router.post('/', function (req, res) {
  const { body } = req;
  let output = {};

  const addStudentQuery = " INSERT INTO `grades` (name, grade, course, course_id ) " +
                          "  VALUES (?, ?, ?, 1) ";

  const insertStudentResult = [
    body.nameInput,
    parseInt(body.gradeInput),
    body.courseInput,
    parseInt(course_id)
  ]

  db.query(addStudentQuery, (err, insertStudentResult) => {
    if (err) {
      output = {
        success: false,
        data: err
      };
      res.status(500).json(output);
    } else {
      console.log(data);
      output = {
        success: true,
        data: insertStudentResult
      };
      res.status(200).json(output);
    }
  })
});

module.exports = router;
