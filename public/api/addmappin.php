<?php

require_once('config.php');

//retrieve POST
//$json_input = file_get_contents("php://input");
//$input = json_decode($json_input, true);


$latitude = -117.765991;
$longitude = 33.728851;
$trips_id = 1;

$query = "INSERT INTO `pins`
    SET
        `trips_id` = $trips_id,
        `latitude` = $latitude,
        `longitude` = $longitude,
        `description` = 'LearningFuze Coding Bootcamp',
        `added` = NOW()
";

$result = mysqli_query($conn, $query);
print_r($result);
//return 1
?>
