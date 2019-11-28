const express = require('express');
const router = express.Router();
const db = require('../../../db_connection');

router.use(express.json());

router.delete('/:studentID', function (req, res) {

  let output = {};
  let studentID = req.params.studentID;
  let deleteStudentQuery = " DELETE FROM `grades` WHERE `id` = " + studentID ;

  db.query(deleteStudentQuery, (err, deleteStudentResult) => {
    if (err) {
      output = {
        success: false,
        data: err
      };
      res.status(500).json(output);
    } else {
      output = {
        success: true,
        data: deleteStudentResult.affectedRows
      };
      res.status(200).json(output);
    }
  });
});

module.exports = router;
