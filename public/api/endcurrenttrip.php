<?php

require_once('config.php');

$trips_id = intval($_GET['trips_id']);

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
};

$query = "UPDATE `trips`
    SET
        `end` = NOW()
    WHERE `id` = $trips_id
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to end trip');
}

$select_query = "SELECT *
    FROM `trips`
    WHERE `id` = $trips_id
";

$update_result = mysqli_query($conn, $select_query);

if (!$update_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($update_result) !== 1) {
    throw new Exception('Unable to retrieve trip details');
}

$row = mysqli_fetch_assoc($update_result);

$output['success'] = true;
$output['data'] = [
    'trips_name' => $row['trips_name'],
    'region' => $row['region'],
    'start' => $row['start'],
    'end' => $row['end']
];

print(json_encode($output));

?>
