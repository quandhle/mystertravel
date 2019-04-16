<?php

require_once('config.php');

$add_query = "INSERT INTO `budget`
    SET
        `trips_id` = 1,
        `category` = 'phpmyadmin budget',
        `price` = 50000,
        `added` = NOW()
";

mysqli_query($conn, $add_query);

require_once('getbudgetlist.php');

// $query = "SELECT * FROM `budget` WHERE `trips_id` = 1";

// $result = mysqli_query($conn, $query);

// $data = [];

// while ($row = mysqli_fetch_assoc($result)) {
//     $data[] = [
//         'category' => $row['category'],
//         'price' => $row['price'],
//     ];
// };

// $output['success'] = true;
// $output['budget'] = $data;

// print(json_encode($output));