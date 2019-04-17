<?php

require_once('config.php');

$api = $_GET['api'];

if (empty($api)) {
    throw new Exception('Please provide API.');
};

$query = "SELECT * FROM `api_keys` WHERE `api` = 'google'";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($query));
};

if (!$result) {
    throw new Exception('Invalid API.');
};

$row = mysqli_fetch_assoc($result);

$output['success'] = true;
$output['data'] = [
    'api' => $row['api'],
    'api_key' => $row['api_key']
];

print(json_encode($output));

