<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$latitude = $input['latitude'] * 10000000;
$longitude = $input['longitude'] * 10000000;
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
        `trips_id` = ?,
        `latitude` = ?,
        `longitude` = ?,
        `description` = ?,
        `name` = ?,
        `added` = NOW()
";


$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'dddss', $trips_id, $latitude, $longitude, $description, $name);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Map pin was not added');
}

$pin_id = mysqli_insert_id($conn);

$output['success'] = true;

print(json_encode($output));

?>
