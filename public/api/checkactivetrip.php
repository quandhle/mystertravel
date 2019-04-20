<?php

require_once('config.php');

if (!empty($_SESSION['user_data'])) {
    $users_id = $_SESSION['user_data']['id'];
    $trips_id = $_SESSION['user_data']['trips_id'];
} else {
    $users_id = $_GET['users_id'];
    $trips_id = $_GET['trips_id'];
}

if(empty($users_id)){
    throw new Exception('Please provide users_id (int) with your request');
}

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT `end`
    FROM `trips`
    WHERE `users_id` = ?
    AND `id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param( $statement, 'dd', $users_id, $trips_id);
mysqli_stmt_execute( $statement);

$result = mysqli_stmt_get_result($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    throw new Exception('Unable to find trips from this user with this trips_id (int)');
}

$row = mysqli_fetch_assoc($result);

if(empty($row['end'])){
    $output['success'] = true;
    $output['trip_status'] = 'active';
    print(json_encode($output));
    exit();
}

//trip has an end date, trip is inactive
$output['success'] = true;

print(json_encode($output));

?>
