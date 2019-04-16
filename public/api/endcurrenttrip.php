<?php

require_once('config.php');

// $trips_id = $_GET['trips_id'];

$query = "UPDATE `trips`
    SET
        `departure` = NOW()
    WHERE `id` = 1
";

$result = mysqli_query($conn, $query);

$select_query = "SELECT * 
    FROM `trips`
    WHERE `id` = 1
";

$update_result = mysqli_query($conn, $select_query);

$row = mysqli_fetch_assoc($update_result);

print_r($row['city']);

$output['success'] = true;
$output['data'] = [
    'city' => $row['city'],
    'country' => $row['country'],
    'arrival' => $row['arrival'],
    'departure' => $row['departure']
];

print(json_encode($output));