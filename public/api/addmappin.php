<?php

require_once('config.php');

$query = "INSERT INTO `pins`
    SET
        `trips_id` = 1,
        `latitude` = 21341,
        `longitude` = 143243, 
        `description` = 'LearningFuze Coding Bootcamp'
        `added` = NOW();
";

