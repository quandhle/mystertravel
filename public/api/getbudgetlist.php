<?php

require_once('config.php');

$trips_id = $_GET['trips_id'];

$query = "SELECT * FROM `budget` WHERE `trips_id` = 1";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Please provide trip ID.');
};

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'category' => $row['category'],
        'price' => $row['price'],
    ];
};

$output['success'] = true;
$output['budget'] = $data;

print(json_encode($output));
