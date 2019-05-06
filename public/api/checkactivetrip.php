<?php

require_once('config.php');

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
    $_SESSION['user_data']['trips_id'] = null;
}

$trip = mysqli_fetch_assoc($result);

if (empty($trip['end'])) {
    $output['trips_id'] = $trip['id'];
    $_SESSION['user_data']['trips_id'] = $trip['id'];
} else {
    $output['trips_id'] = null;
    $_SESSION['user_data']['trips_id'] = null;
}

?>
