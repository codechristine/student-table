const express = require('express');
const router = express.Router();
const db = require('../../../db_connection');

router.use(express.json());

router.post('/', function (req, res) {
  const { body } = req.body;

  if (!body.id){
    db.query(" INSERT INTO `grades` (`name`) VALUES (?) ", (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          data: err
        });
      } else {
        const id = data.insertID;
        addStudent(req, res, body, id);
      }
    });
    } else {
      addStudent(req, res, body, parseInt(body.id));
    }
  });

  function addStudent(req, res, body, id){

    let output = {};

    let addStudentQuery = " INSERT INTO `grades` (`id`, `name`, `grade`, `course` ) " +
                            "  VALUES (?, ?, ?, ?) ";

    const insertStudentValues = [
      parseInt(id),
      body.nameInput,
      body.gradeInput,
      body.courseInput
    ];

    db.query(addStudentQuery, insertStudentValues, (err, insertStudentResult) => {
      if (err) {
        output = {
          success: false,
          data: err
        };
        res.status(500).json(output);
      } else {
        output = {
          success: true,
          data: insertStudentResult
        };
        res.status(200).json(output);
      }
    })
  }

module.exports = router;
