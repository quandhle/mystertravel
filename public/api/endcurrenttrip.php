<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if(!empty($_SESSION['user_data']['trips_id'])){
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "UPDATE `trips`
    SET
        `end` = NOW()
    WHERE `id` = $trips_id
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to add end trip date');
}

$output['success'] = true;

print(json_encode($output));

?>
