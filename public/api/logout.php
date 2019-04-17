<?php

require_once('config.php');

$token = 'lkasdjflksdflj';

if (empty($token)) {
    $output['success'] = true;
    $output['message'] = "You weren't logged in.";

    print(json_encode($output));

    exit();
}

// $token = $_SESSION['user_data']['token'];

$query = "DELETE FROM
        `user_connections`
    WHERE `token` = '$token'
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('Invalid username or password.');
};

unset($_SESSION['user_data']);

$output['success'] = true;

print(json_encode($output));