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

$entry = $_POST['entry'];
$image = $_FILES;

if(empty($trips_id)){
    throw new Exception('Please provide trips_id (int) with your request');
}

if(empty($entry)){
    throw new Exception('Please enter a diary entry (str) with your request');
}
if(isset($_FILES['image']['name'])){
    require_once('upload/upload.php');
    require_once('upload/get.php');
}

$query = "INSERT INTO `notes` SET
    `trips_id` = $trips_id,
    `entry_date` = NOW(),
    `entry` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 's', $entry);
$result = mysqli_stmt_execute($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to add note entry');
}

$note_id = mysqli_insert_id($conn);

if(isset($_FILES['image']['name'])){
    $image_query = "UPDATE `notes`
        SET `image` = '$url'
        WHERE `id` = $note_id
    ";

    $result = mysqli_query($conn, $image_query);
}
$output = [];
$output['success'] = true;

print(json_encode($output));

?>
