<?php

require_once('config.php');

// if (!empty($_SESSION['user_data'])) {
//     $token = $_SESSION['user_data']['token'];
// } else {
//     $token = $_GET['token'];
// }

// if(empty($users_id)){
//     throw new Exception('Please provide users_id (int) with your request');
// }

$query = "SELECT `id`, `end`
    FROM `trips`
    WHERE `users_id` = ?
    ORDER BY `start` DESC
    LIMIT 1
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $users_id);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    $output['trips_id'] = null;
}

$row = mysqli_fetch_assoc($result);

if (empty($row['end'])) {
    //$output['success'] = true;
    $output['trips_id'] = $row['id'];
    // print(json_encode($output));
    // exit();
} else {
    $output['trips_id'] = null;
}

//trip has an end date, trip is inactive
//$output['success'] = true;

//print(json_encode($output));

?>
