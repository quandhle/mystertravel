<?php

require_once('functions.php');
set_exception_handler('handleError');

session_start();

handleCors();

require_once('mysqlconnect.php');

$ouput = [
    'success' => false
];

?>
