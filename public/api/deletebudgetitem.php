<?php

require_once('config.php');

print('Hello world');

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
        `category` = LOWER('$category')
    AND
        `price` = '$price'
";

if (!$result) {
    throw new Exception('Please provide necessary information to delete budget item.');
};

if (mysqli_affected_rows(($result) !== 1 || mysqli_affected_rows(($results) > 1))) {
    throw new Exception ('More than one budget item affected.');
}

$output['success'] = true;

print(json_encode($output));