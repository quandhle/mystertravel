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

$id = intval($input['id']);
$description = $input['description'];

if (empty($trips_id)) {
    throw new Exception('Please provide trip id.');
}

if (empty($description)) {
    throw new Exception('Please provide updated description.');
};

if (empty($id)) {
    throw new Exception('Please provide note id.');
};

$query = "UPDATE `notes`
    SET
        `entry` = ?,
        `updated` = NOW()
    WHERE
        `id` = $id AND
        `trips_id` = $trips_id
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 's', $description);
mysqli_stmt_execute($statement);

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Unable to update note.');
};

$output['success'] = true;

print(json_encode($output));
