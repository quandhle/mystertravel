<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $input['trips_id'];
$entry = $input['entry'];

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

if(empty($entry)){
    throw new Exception('Please provide entry (str) with your request');
}

$query = "DELETE FROM `notes`
    WHERE `trips_id` = ?,
    AND `entry` = ?
    LIMIT 1
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ds', $trips_id, $entry);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) === 0){
    throw new Exception('Unable to delete note entry');
}

$output['success'] = true;

print(json_encode($output));

?>
