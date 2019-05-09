<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

$output = [
    'success' => false
];

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$latitude = intval($input['latitude'] * 10000000);
$longitude = intval($input['longitude'] * 10000000);
$name = $input['name'];
$description = $input['description'];

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

if(empty($name)){
    throw new Exception('Please provide a name (str) with your request');
}

if(empty($description)){
    throw new Exception('Please enter map pin description (str) with your request');
}

if(empty($latitude) || empty($longitude)){
    throw new Exception('Please provide location (float) with your request');
}

$query = "INSERT INTO `pins` SET
        `trips_id` = $trips_id,
        `latitude` = $latitude,
        `longitude` = $longitude,
        `description` = ?,
        `name` = ?,
        `added` = NOW()
";


$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ss', $description, $name);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Map pin was not added');
}

$output['success'] = true;

print(json_encode($output));

?>
