<?php

require_once('config.php');

$add_query = "INSERT INTO `current_todo`
    SET
        `trips_id` = 1,
        `task` = 'Finish this endpoint',
        `date` = NOW(),
        `status` = 0
";

mysqli_query($conn, $add_query);

require_once('getcurrenttodo.php');