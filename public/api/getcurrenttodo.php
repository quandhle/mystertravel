<?php

require_once('config.php');

$trips_id = $_GET['trips_id'];

if (empty($trips_id)) {
    throw new Exception('Please provide trip ID.');
};

$query = "SELECT * FROM `current_todo` WHERE `trips_id` = $trips_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    throw new Exception('Unable to retrive todo items');
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'task' => $row['task'],
        'date' => $row['task_date'],
        'status' => $row['status']
    ];
}

$output['success'] = true;
$output['tasks'] = $data;

print(json_encode($output));
