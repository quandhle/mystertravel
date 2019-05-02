<?php

require_once('config.php');

if (empty($_SESSION['user_data']['token'])) {
    $output['success'] = true;
    $output['login'] = false;

    print(json_encode($output));
    exit();
}

$token = $_SESSION['user_data']['token'];

$query = "DELETE FROM
        `user_connections`
    WHERE `token` = '$token'
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    $output['success'] = true;
    $output['login'] = false;

    print(json_encode($output));
    exit();
}

unset($_SESSION['user_data']);

$output['success'] = true;

print(json_encode($output));

?>
