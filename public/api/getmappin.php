<?php

require_once('config.php');

$trips_id = intval($_GET['trips_id']);

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT * FROM `pins` WHERE `trips_id` = ?";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    $output['success'] = true;
    $output['data'] = [];
    print(json_encode($output));
    exit();
}

while ($row = mysqli_fetch_assoc($result)) {
    $latitude = intval($row['latitude']) / 10000000;
    $longitude = intval($row['longitude'])/ 10000000;
    $data[] = [
        'pin_id' => $row['id'],
        'lat' => $latitude,
        'lng' => $longitude,
        'description' => $row['description'],
        'name' => $row['name']
    ];
}

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));

?>
