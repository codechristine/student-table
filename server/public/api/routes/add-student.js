const express = require('express');
const router = express.Router();
const db = require('../../../db_connection');

router.use(express.urlencoded({
  extended: true
}));

router.use(express.json());

router.post('/', function (req, res) {
    let output = {};

    let addStudentQuery = " INSERT INTO `grades` (`name`, `course`, `grade` ) " +
                            "  VALUES (?, ?, ?) ";

    const insertStudentValues = [
      req.body.name,
      req.body.course,
      req.body.grade
    ];

    addStudentQuery = db.format(addStudentQuery, insertStudentValues)

    db.query(addStudentQuery, (err, insertStudentResult) => {
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
});

module.exports = router;
