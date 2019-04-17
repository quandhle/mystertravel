<?php

require_once('config.php');

// $id = $_GET['id'];

if (empty($id)) {
    throw new Exception('Please provide trip id.');
};

$query = "UPDATE `trips`
    SET
        `departure` = NOW()
    WHERE `id` = 1
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Invalid ID.');
};

$select_query = "SELECT * 
    FROM `trips`
    WHERE `id` = 1
";

$update_result = mysqli_query($conn, $select_query);

if (!$update_result) {
    throw new Exception(mysqli_error($conn));
};

if (!$update_result) {
    throw new Exception('Invalid ID.');
};

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