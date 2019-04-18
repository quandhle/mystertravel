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

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'lat' => $row['latitude'],
        'lng' => $row['longitude'],
        'description' => $row['description']
    ];
};

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));

// return all rows of map pins with lat, lng, description, added
