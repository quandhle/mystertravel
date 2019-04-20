<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $input['trips_id'];
$budget_id = $input['budget_id'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($budget_id)) {
    throw new Exception('Please provide budget_id (int) with your request');
}

$query = "DELETE
    FROM `budget`
    WHERE `trips_id` = ?
    AND `budget_id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'dd', $trips_id, $budget_id);
$result = mysqli_stmt_execute($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) === 0) {
    throw new Exception ('Unable to find and delete budget entry');
}

$output['success'] = true;

print(json_encode($output));

?>
