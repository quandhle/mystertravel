<?php
require_once('config.php');

//need trips_id(int)
//intval($_GET['trips_id'])

$trips_id = 1;

$query = "SELECT `entry`, `date` FROM `diary` WHERE `trips_id` = $trips_id";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    throw new Exception('No entry retrieved');
}

$data = [];
while($row = mysqli_fetch_assoc($result)){
    $entry = $row['entry'];
    $date = date("m/d/Y H:i:s", strtotime($row['date']));
    $data[] = [
        'entry' => $entry,
        'date' => $date
    ];
}

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));
?>
