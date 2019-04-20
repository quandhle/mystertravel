<?php

require_once('config.php');

$trips_id = intval($_GET['trips_id']);

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "UPDATE `trips`
    SET
        `end` = NOW()
    WHERE `id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
$result = mysqli_stmt_execute($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to end trip');
}

$end_trip_query = "SELECT t.`trips_name`, t.`region`,
    t.`start`, t.`end`, SUM(b.`price`) AS 'total_budget',
        (SELECT `entry`
        FROM `notes`
        WHERE `trips_id` = t.`id`
        ORDER BY `entry_date` DESC
        LIMIT 1)
        AS 'last_entry'
    FROM `trips` AS t
    JOIN `budget` AS b
        ON t.`id` = b.`trips_id`
    WHERE t.`id` = ?
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
    'end' => $row['end'],
    'total_budget' => $row['total_budget'],
    'last_entry' => $row['last_entry']
];

print(json_encode($output));

?>
