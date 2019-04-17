<?php

require_once('config.php');

// $trips_id = $_GET['trips_id'];
// $category = $_GET['category'];
// $price = $_GET['price'];

// if (empty($trips_id)) {
//     throw new Exception('Invalid trip id.');
// }

// if (empty($category)) {
//     throw new Exception('Please provide category.');
// };

// if (empty($price)) {;
//     throw new Exception('Please enter price.');
// }

$add_query = "INSERT INTO `budget`
    SET
        `trips_id` = 1,
        `category` = 'phpmyadmin budget',
        `price` = 50000,
        `added` = NOW()
";

$result = mysqli_query($conn, $add_query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

$output['success'] = true;

print(json_encode($output));