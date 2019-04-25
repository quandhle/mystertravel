<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = $input['trips_id'];
$id = $input['id'];
$description = $input['description'];
$category = $input['category'];
$price = $input['price'];

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
    `price` = ?,
    `updated` = NOW()
    WHERE `id` = ?
    AND `trips_id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ssddd', $description, $category, $price, $id, $trips_id);
mysqli_stmt_execute($statement);

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Unable to update budget item');
}

$output['success'] = true;

print(json_encode($output));

?>
