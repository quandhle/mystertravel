<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$latitude = $input['latitude'] * 10000000;
$longitude = $input['longitude'] * 10000000;

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($latitude) || empty($longitude)) {
    throw new Exception('Please provide location with your request');
}

$query = "DELETE FROM `pins` WHERE
    `trips_id` = ? AND
    `latitude` = ? AND
    `longitude` = ?
    LIMIT 1
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ddd', $trips_id, $latitude, $longitude);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception(('Unable to delete map pin'));
}

$output['success'] = true;

print(json_encode($output));

?>
