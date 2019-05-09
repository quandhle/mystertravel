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
$category = $input['category'];
$price = intval($input['price']);

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($description)) {
    throw new Exception('Please enter description (str) with your request');
}

if (empty($category)) {
    throw new Exception('Please select category (str) with your request');
}

if (empty($price)) {
    throw new Exception('Please enter price (int) with your request');
}

if (empty($id)) {
    throw new Exception('Please provide budget id (int) with your request');
}

$query = " UPDATE `budget` SET
    `description` = ?,
    `category` = ?,
    `price` = $price,
    `updated` = NOW()
    WHERE `id` = $id
    AND `trips_id` = $trips_id
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ss', $description, $category);
mysqli_stmt_execute($statement);

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to update budget item');
}

$output['success'] = true;

print(json_encode($output));

?>
