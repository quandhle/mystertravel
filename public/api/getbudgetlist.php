<?php

require_once('config.php');

$query = "SELECT * FROM `budget` WHERE `trips_id` = 1";

$result = mysqli_query($conn, $query);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'category' => $row['category'],
        'price' => $row['price'],
    ];
};

$output['success'] = true;
$output['budget'] = $data;

print(json_encode($output));
