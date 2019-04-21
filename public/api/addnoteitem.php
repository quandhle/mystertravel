<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$entry = $input['entry'];

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

if(empty($entry)){
    throw new Exception('Please enter a diary entry (str) with your request');
}

$query = "INSERT INTO `notes` SET
    `trips_id` = ?,
    `entry_date` = NOW(),
    `entry` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ds', $trips_id, $entry);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to add note entry');
}

$note_id = mysqli_insert_id($conn);

$output['success'] = true;
$output['note_id'] = $note_id;

print(json_encode($output));

?>
