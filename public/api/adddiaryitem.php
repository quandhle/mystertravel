<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$entry = addslashes($input['entry']);

if(empty($trips_id)){
    throw new Exception('Must provide trips_id (int) with your request');
};

if(empty($entry)){
    throw new Exception('Must provide a diary entry (str) with your request');
};

$query = "INSERT INTO `diary` SET
    `trips_id` = $trips_id,
    `date` = NOW(),
    `entry` = '$entry'
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
};

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Diary entry was not added');
};

$output['sucess'] = true;

print(json_encode($output));

?>
