<?php

require_once('config.php');

$query = "SELECT * FROM `budget` WHERE `trips_id` = 1";

$result = mysqli_query($conn, $query);

$output['budget'] = $result;

print_r(json_output($output));