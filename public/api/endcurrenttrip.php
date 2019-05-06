<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $_SESSION['user_data']['trips_id'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "UPDATE `trips`
    SET
        `end` = NOW()
    WHERE `id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
$result = mysqli_stmt_execute($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to add end trip date');
}

$output['success'] = true;

print(json_encode($output));

?>
