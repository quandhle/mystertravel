<?php

require_once('config.php');

$query = "SELECT `id`, `end`
    FROM `trips`
    WHERE `users_id` = $users_id
    ORDER BY `start` DESC
    LIMIT 1
";

$result = mysqli_query($conn, $query);

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
