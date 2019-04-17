<?php

require_once('config.php');

// $trips_id = $_GET['trips_id'];

if (empty($trips_id)) {
    throw new Exception('Please provide trip ID.');
};

$query = "SELECT * FROM `current_todo` WHERE trips_id = 1";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Please provide trip ID.');
};

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'task' => $row['task'],
        'date' => $row['date'],
        'status' => $row['status']
    ];
}

$output['success'] = true;
$output['tasks'] = $data;

print(json_encode($output));