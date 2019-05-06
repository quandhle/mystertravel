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

$latitude = intval($input['latitude'] * 10000000);
$longitude = intval($input['longitude'] * 10000000);
$description = $input['description'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($description)) {
    throw new Exception('Please enter description (str) with your request');
}

if (empty($latitude) || empty($longitude)) {
    throw new Exception('Please provide location with your request');
}

$query = "UPDATE `pins` SET
    `description` = ?,
    `updated` = NOW()
    WHERE `latitude` = $latitude
    AND `longitude` = $longitude
    AND `trips_id` = $trips_id
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 's', $description);
mysqli_stmt_execute($statement);

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to update map pin description item');
}

$output['success'] = true;

print(json_encode($output));

?>
