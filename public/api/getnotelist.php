<?php

require_once('config.php');

$trips_id = intval($_GET['trips_id']);

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT *
    FROM `notes`
    WHERE `trips_id` = ?
    ORDER BY `entry_date` DESC
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $trips_id);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

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
        'note_id' => $row['id'],
        'entry' => $row['entry'],
        'date' => $date
    ];
}

$output['success'] = true;
$output['notes'] = $data;

print(json_encode($output));
?>
