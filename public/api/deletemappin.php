<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

$output = [
    'success' => false
];

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$pin_id = intval($input['pin_id']);

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($pin_id)) {
    throw new Exception('Please provide pin_id (int) with your request');
}

$query = "DELETE FROM `pins`
    WHERE `trips_id` = $trips_id
    AND `id` = $pin_id
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) === 0){
    throw new Exception(('Unable to find and delete map pin'));
}

$output['success'] = true;

print(json_encode($output));

?>
