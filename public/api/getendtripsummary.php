<?php

require_once('config.php');

if (!empty($_GET['trips_id']) && !empty($_GET['users_id'])) {
    $trips_id = intval($_GET['trips_id']);
    $users_id = intval($_GET['users_id']);
} else if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
    $users_id = intval($_SESSION['user_data']['users_id']);
} else {
    throw new Exception('Invalid Url');
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($users_id)) {
    throw new Exception('Please provide users_id (int) with your request');
}

$summary_query = "SELECT t.`trips_name`,
    (SELECT SUM(`price`)
    FROM `budget`
    WHERE `trips_id` = $trips_id
    ) AS 'total_budget'
    FROM `trips` AS t
    WHERE t.`users_id` = $users_id
    AND t.`id` = $trips_id
";

$summary_result = mysqli_query($conn, $summary_query);

if (!$summary_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($summary_result) === 0) {
    throw new Exception('Invalid trips_id or users_id');
}

$summary_row = mysqli_fetch_assoc($summary_result);

$output['summary'] = [
    'trips_name' => $summary_row['trips_name'],
    'total_budget' => $summary_row['total_budget'],
];

$pins_query = "SELECT *
    FROM `pins`
    WHERE `trips_id` = $trips_id
";

$pins_result = mysqli_query($conn, $pins_query);

if (!$pins_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($pins_result) === 0) {
    $output['pins'] = [];
} else {
    while ($pins_row = mysqli_fetch_assoc($pins_result)) {
        $latitude = intval($pins_row['latitude']) / 10000000;
        $longitude = intval($pins_row['longitude']) / 10000000;
        $date = date("m/d/Y H:i:s", strtotime($pins_row['added']));
        $pins[] = [
            'pin_id' => $pins_row['id'],
            'lat' => $latitude,
            'lng' => $longitude,
            'description' => $pins_row['description'],
            'name' => $pins_row['name'],
            'date' => $date
        ];
    }
    $output['pins'] = $pins;
}

$notes_query = "SELECT *
    FROM `notes`
    WHERE `trips_id` = $trips_id
    ORDER BY `entry_date` DESC
";

$notes_result = mysqli_query($conn, $notes_query);

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
