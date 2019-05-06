<?php

require_once('config.php');

if (!empty($_SESSION['user_data'])){
    $users_id = intval($_SESSION['user_data']['users_id']);
} else {
    require_once('loginguest.php');
    $output['login'] = true;
    $output['is_guest'] = true;
    $output['username'] = 'Guest';
    $output['token'] = $token;
}

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_name = $input['trips_name'];

if(empty($trips_name)){
    throw new Exception('Please enter a name for the trip');
}

$query = "INSERT INTO `trips` SET
    `users_id` = $users_id,
    `trips_name` = ?,
    `start` = NOW()
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 's', $trips_name);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to create new trip');
}

$trips_id = mysqli_insert_id($conn);

$_SESSION['user_data']['trips_id'] = $trips_id;

$output['success'] = true;
$output['trips_id'] = $trips_id;

print(json_encode($output));

?>
