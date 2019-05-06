<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT *
    FROM `notes`
    WHERE `trips_id` = $trips_id
    ORDER BY `entry_date` DESC
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    $output['success'] = true;
    $output['notes'] = [];
    print(json_encode($output));
    exit();
}

$data = [];
while($row = mysqli_fetch_assoc($result)){
    $date = date("m/d/Y H:i:s", strtotime($row['entry_date']));
    $data[] = [
        'note_id' => $row['id'],
        'image' => $row['image'],
        'entry' => $row['entry'],
        'date' => $date
    ];
}

$output['success'] = true;
$output['notes'] = $data;

print(json_encode($output));
?>
