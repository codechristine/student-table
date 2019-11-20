const express = require('express');
const router = express.Router();
const db = require('../../../db_connection');

router.use(express.json());

router.delete('/:studentID', function (req, res) {

  // let output = {};
  let id = req.params.id.toString();
  let collection = db.get('get-student');
  // let deleteStudentQuery = " DELETE FROM `grades` WHERE id = req.params.id ";

  collection.remove({ "_id":id }), (err, data) => {
    res.send( ( data === 1 ) ? { msg: 'deleted'} : { msg: 'error' + err } );
  };
});
  //   db.query(deleteStudentQuery, req.params.id, (err, deleteStudentResult) => {
  //     if (err) {
  //       output = {
  //         success: false,
  //         data: err
  //       };
  //       res.status(500).json(output);
  //     } else {
  //       output = {
  //         success: true,
  //         data: deleteStudentResult.affectedRows
  //       };
  //       res.status(200).json(output);
  //     }
  //   });
  // });
  // let output = {};

  // let deleteStudentQuery = " DELETE FROM `grades` WHERE id = {id} ";

  // const deleteStudentValues = [

  // ];

  // db.query(deleteStudentQuery, deleteStudentValues, (err, deleteStudentResult) => {
  //   if (err) {
  //     output = {
  //       success: false,
  //       data: err
  //     };
  //     res.status(500).json(output);
  //   } else {
  //     output = {
  //       success: true,
  //       data: deleteStudentResult
  //     };
  //     res.status(200).json(output);
  //   }
  // })
// });

module.exports = router;
