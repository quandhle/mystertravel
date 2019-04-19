<?php

require_once('config.php');

$trips_id = intval($_GET['trips_id']);

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT * FROM `notes` WHERE `trips_id` = $trips_id";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    throw new Exception('No entry retrieved.');
}

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $date = date("m/d/Y H:i:s", strtotime($row['entry_date']));
    $data[] = [
        'entry' => $row['entry'],
        'date' => $date
    ];
}

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));
?>
