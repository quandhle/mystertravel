<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $input['trips_id'];
$description = $input['description'];
$category = $input['category'];
$price = $input['price'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

if (empty($description)) {
    throw new Exception('Please provide description (str) with your request');
}

if (empty($category)) {
    throw new Exception('Please provide category (str) with your request');
}

if (empty($price)) {
    throw new Exception('Please provide price (int) with your request');
}

$query = "DELETE
    FROM `budget`
    WHERE `trips_id` = ?
    AND `description` = ?
    AND `category` = ?
    AND `price` = ?
    LIMIT 1
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'dssd', $trips_id, $description, $category, $price);
$result = mysqli_stmt_execute($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) === 0) {
    throw new Exception ('Unable to delete budget entry');
}

$output['success'] = true;

print(json_encode($output));

?>
