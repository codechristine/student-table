const express = require('express');
const router = express.Router();
const db = require('../../db_connection');

router.use(express.json());

router.get('/', function (req, res) {
  let output = null;

  let getStudentquery = " SELECT * FROM `grades` WHERE 1 " ;

    db.query(getStudentquery, (err, data) => {
    if (err) {
      output = {
        success: false,
        data: err
      };
      res.status(500);
    } else {
      output = {
        success: true,
        data: data
      };
      res.status(200).json(output);
    }
  })
});

module.exports = router;
