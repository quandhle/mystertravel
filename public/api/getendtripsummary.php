<?php

require_once('config.php');

$trips_id = $_GET['trips_id'];

$summary_query = "SELECT t.`trips_name`,
    SUM(b.`price`) AS 'total_budget'
    FROM `trips` AS t
    JOIN `budget` AS b
        ON t.`id` = b.`trips_id`
    WHERE t.`id` = ?
    GROUP BY t.`id`
";

$summary_statement = mysqli_prepare($conn, $summary_query);
mysqli_stmt_bind_param($summary_statement, 'd', $trips_id);
mysqli_stmt_execute($summary_statement);

$summary_result = mysqli_stmt_get_result($summary_statement);

if (!$summary_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($summary_result) === 0) {
    $output['summary'] = [];
} else {
    $summary_row = mysqli_fetch_assoc($summary_result);

    $output['summary'] = [
        'trips_name' => $summary_row['trips_name'],
        'total_budget' => $summary_row['total_budget'],
    ];
}

$pins_query = "SELECT *
    FROM `pins`
    WHERE `trips_id` = ?
";

$statement = mysqli_prepare($conn, $pins_query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
mysqli_stmt_execute($statement);

$pins_result = mysqli_stmt_get_result($statement);

if (!$pins_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($pins_result) === 0) {
    $output['pins'] = [];
} else {
    while ($pins_row = mysqli_fetch_assoc($pins_result)) {
        $latitude = intval($pins_row['latitude']) / 10000000;
        $longitude = intval($pins_row['longitude']) / 10000000;
        $pins[] = [
            'pin_id' => $pins_row['id'],
            'lat' => $latitude,
            'lng' => $longitude,
            'description' => $pins_row['description'],
            'name' => $pins_row['name']
        ];
    }
    $output['pins'] = $pins;
}

$notes_query = "SELECT *
    FROM `notes`
    WHERE `trips_id` = ?
    ORDER BY `entry_date` DESC
";

$statement = mysqli_prepare($conn, $notes_query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
mysqli_stmt_execute($statement);

$notes_result = mysqli_stmt_get_result($statement);

if (!$notes_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($notes_result) === 0) {
    $output['notes'] = [];
} else {
    while ($notes_row = mysqli_fetch_assoc($notes_result)) {
        $date = date("m/d/Y H:i:s", strtotime($notes_row['entry_date']));
        $notes[] = [
            'note_id' => $notes_row['id'],
            'image' => $notes_row['image'],
            'entry' => $notes_row['entry'],
            'date' => $date
        ];
    }
    $output['notes'] = $notes;
}

$output['success'] = true;

print(json_encode($output));

?>
