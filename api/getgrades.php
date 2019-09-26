<?php

require_once('functions.php');
// set_error_handler('handleErrors');
set_exception_handler('handleErrors');

require_once('mysqlconnect.php');

$query = "SELECT g.`id`, g.`name`, g.`grade`,
	c.`name` AS `course`
		FROM `grades` AS g
			JOIN `courses` AS c
   			 ON c.`id` = g.`course_id`";
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception('query error' .mysqli_error($conn));
}

$data = [];
while($row = mysqli_fetch_assoc($result)){
  $row['id'] = intval($row['id']);
  // $row['id'] = (int)$row['grade'];//another way to change the strings to numbers
  $row['grade'] = intval($row['grade']);
  $data[] = $row;
  // $data[count($data)] = $row; // another way to push in an array without using push
};
$output = [
  'data' => $data,
  'success'=>true
];

$jsonData = json_encode($output);

print($jsonData);

?>
