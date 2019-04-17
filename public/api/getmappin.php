<?php

require_once('config.php');

// $description = $_GET['description'];
// $longitude = $_GET['longitude'];
// $latitude = $_GET['latitude'];
// $trips_id = $_GET['trips_id'];

if (empty($description)) {
    throw new Exception ('Please enter description.');
};

if (empty($longitude)) {
    throw new Exception('Please provide longitude.');
};

if (empty($latitude)) {
    throw new Exception('Please provide latitude.');
};

if (empty($trips_id)) {
    throw new Exception('Please provide trip id.');
};

$query = "SELECT * FROM `pins` WHERE `trips_id` = 1";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Please provide trip id.');
};

$output['success'] = true;