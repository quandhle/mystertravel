<?php

require_once('config.php');

$token = $_SESSION['user_data']['token'];

if (empty($token)) {
    $output['success'] = true;
    $output['message'] = "You weren't logged in.";

    print(json_encode($output));
    exit();
}

$query = "DELETE FROM
        `user_connections`
    WHERE `token` = '$token'
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Invalid username or password.');
}

unset($_SESSION['user_data']);

$output['success'] = true;

print(json_encode($output));

?>
