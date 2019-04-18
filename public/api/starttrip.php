<?php
require_once("config.php");

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$users_id = 1;
//intval($input['users_id']);
$trip_name = $input['name'];
$country = $input['country'];

$query = "INSERT INTO `trips` SET
    `users_id` = $users_id,
    `name` = ?,
    `country` = ?,
    `arrival` = NOW()
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ss', $trip_name, $country);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to create trip');
}

$trips_id = mysqli_insert_id($conn);

$output['success'] = true;
$output['trips_id'] = $trips_id;

print(json_encode($output));

?>
