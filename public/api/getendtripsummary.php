<?php

require_once('config.php');

$trips_id = $_GET['trips_id'];

$summary_query = "SELECT t.`trips_name`, t.`region`,
    SUM(b.`price`) AS 'total_budget',
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

$summary_statement = mysqli_prepare($conn, $summary_query);
mysqli_stmt_bind_param($summary_statement, 'd', $trips_id);
mysqli_stmt_execute($summary_statement);

$summary_result = mysqli_stmt_get_result($summary_statement);

if (!$summary_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($summary_result) === 0) {
    $output['success'] = true;
    $output['tasks'] = [];
    print(json_encode($output));
    exit();
}

$row = mysqli_fetch_assoc($summary_result);

$output['success'] = true;
$output['data'] = [
    'trips_name' => $row['trips_name'],
    'region' => $row['region'],
    'total_budget' => $row['total_budget'],
    'last_entry' => $row['last_entry']
];

print(json_encode($output));

?>
