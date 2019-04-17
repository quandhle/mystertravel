<?php

require_once('config.php');

// $description = $_GET['description'];
// $longitude = $_GET['longitude'];
// $latitude = $_GET['latitude'];
// $trips_id = $_GET['trips_id'];

$query = "INSERT INTO `pins`
    SET
        `trips_id` = 1,
        `latitude` = 234234,
        `longitude` = 1242134,
        `description` = 'This is a pin',
        `added` = NOW()
";

$result = mysqli_query($conn, $query);

$output['success'] = true;