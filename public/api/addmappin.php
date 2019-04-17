<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$latitude = floatval($input['latitude']);
$longitude = floatval($input['longitude']);
$description = addslashes($input['description']);

if(empty($trips_id)){
    throw new Exception('Must provide trips_id (int) with your request');
}
if(empty($description)){
    throw new Exception('Must provide trip description (str) with your request');
}
if(empty($latitude) || empty($longitude)){
    throw new Exception('Must provide location (float) with your request');
}

$query = "INSERT INTO `pins`
    SET
        `trips_id` = $trips_id,
        `latitude` = $latitude,
        `longitude` = $longitude,
        `description` = '$description',
        `added` = NOW()
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Map pin was not added');
}

$output['success'] = true;

print(json_encode($output));

?>
