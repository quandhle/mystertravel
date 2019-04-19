<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$trips_id = intval($input['trips_id']);
$category = $input['category'];
$price = $input['price'];

if (empty($trips_id)) {
    throw new Exception('Please provide trips id.');
};

if (empty($category)) {
    throw new Exception('Please provide cateogry.');
};

if (empty($price)) {
    throw new Exception('Please provide price.');
};

$query = "DELETE
    FROM `budget`
    WHERE
        `trips_id` = '$trips_id'
    AND
        `category` = '$category'
    AND
        `price` = '$price'
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception ('Zero or more than one budget item affected.');
}

$output['success'] = true;

print(json_encode($output));