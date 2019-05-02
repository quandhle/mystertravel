<?php

$output = [
    'key' => 'this is here to make sure you called the correct file',
    'message' => 'Your setup is correct, successfully communicated with Apache server',
    'success' => true,
];

session_start();
print_r($_SESSION);
// print(json_encode($output));
