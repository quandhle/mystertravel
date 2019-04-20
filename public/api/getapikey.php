<?php

require_once('config.php');

$api = addslashes($_GET['api']);

if (empty($api)) {
    throw new Exception('Please provide API.');
}

$query = "SELECT * FROM `api_keys` WHERE `api` = '$api'";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) !== 1) {
    throw new Exception('Invalid API.');
}

$row = mysqli_fetch_assoc($result);

$output['success'] = true;
$output['data'] = [
    'api' => $row['api'],
    'api_key' => $row['api_key']
];

print(json_encode($output));

?>
