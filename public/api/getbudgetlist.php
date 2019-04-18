<?php

require_once('config.php');

$trips_id = $_GET['trips_id'];

if (empty($trips_id)) {
    throw new Exception('Please provide trip ID.');
}

$query = "SELECT * FROM `budget` WHERE `trips_id` = $trips_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    throw new Exception('Unable to retrieve budget list');
}

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'category' => $row['category'],
        'price' => $row['price'],
    ];
}

$output['success'] = true;
$output['budget'] = $data;

print(json_encode($output));

?>
