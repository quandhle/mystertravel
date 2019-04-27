<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$users_id = $input['users_id'];

if (empty($users_id)) {
    throw new Exception('User does not exist.');
};

$query = "SELECT * FROM `trips` WHERE `users_id` = $users_id";

$result = mysqli_query($conn, $query);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'trips_name' => $row['trips_name'],
        'start' => $row['start'],
        'end' => $row['end'],
        'summary' => $row['summary'],
        'summary_image' => $row['summary_image'],
        'summary_date' => $row['summary_data']
    ];
};

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));