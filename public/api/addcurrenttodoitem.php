<?php

require_once('config.php');

// $trips_id = $_GET['trips_id'];
// $task = $_GET['task'];

// if (empty($trips_id)) {
//     throw new Exception('Please provide trips id.');
// };

// if (empty($task)) {
//     throw new Exception('Please enter task.');
// };

$add_query = "INSERT INTO `current_todo`
    SET
        `trips_id` = 1,
        `task` = 'Finish this endpoint',
        `date` = NOW(),
        `status` = 0
";

$result = mysqli_query($conn, $add_query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Please provide trip ID.');
};

// require_once('getcurrenttodo.php');