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

$output['success'] = true;

print(json_encode($output));