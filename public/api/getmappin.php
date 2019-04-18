<?php

require_once('config.php');

// $trips_id = $_GET['trips_id'];

// if (empty($trips_id)) {
//     throw new Exception('Please provide trip id.');
// };

$query = "SELECT * FROM `pins` WHERE `trips_id` = 1";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_num_rows($result) === 0) {
    throw new Exception('Unable to retrieve map pins');
};

$output['success'] = true;

// return all rows of map pins with lat, lng, description, added
