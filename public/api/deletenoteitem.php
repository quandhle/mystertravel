<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $_SESSION['user_data']['trips_id'];
$note_id = $input['note_id'];

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

if(empty($note_id)){
    throw new Exception('Please provide note_id (int) with your request');
}

$query = "DELETE FROM `notes`
    WHERE `trips_id` = ?
    AND `id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'dd', $trips_id, $note_id);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) === 0){
    throw new Exception('Unable to find and delete note entry');
}

$output['success'] = true;

print(json_encode($output));

?>
