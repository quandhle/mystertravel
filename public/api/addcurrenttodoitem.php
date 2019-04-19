<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$task = $input['task'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($task)) {
    throw new Exception('Please enter task (str) with your request');
}

$query = "INSERT INTO `current_todo`
    SET
        `trips_id` = ?,
        `task` = ?,
        `task_date` = NOW(),
        `status` = 0
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ds', $trips_id, $task);
$result = mysqli_stmt_execute($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to add todo entry');
}

$output['success'] = true;

print(json_encode($output));

?>
