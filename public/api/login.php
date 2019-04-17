<?php

require_once('config.php');

// $json_input = file_get_contents("php://input");

// $input = json_decode($json_input, true);

// $user = $input['email'];
// $password = $input['password'];

// if (empty($user)) {
//     throw new Exception('Please enter email.');
// };

// if (empty($password)) {
//     throw new Exception('Please enter password.');
// };

$user = 'quandhle@gmail.com';
$password = 'password';

$email = addslashes($user);
$hashedPassword = sha1($password);

unset($password);

$query = "SELECT
        `id`, `last_name`, `first_name`
    FROM `users` as u
    WHERE `email` = ? AND `password` = ?
";

$statement = mysqli_prepare($conn, $query);

mysqli_stmt_bind_param($statement, 'ss', $email, $hashedPassword);

$query_result = mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception('Invalid email or password.');
};

if (mysqli_num_rows($result) !== 1) {
    throw new Exception('Invalid email or password.');
};

$data = mysqli_fetch_assoc($result);
$token = $email . $data['id'] . microtime();
$token = sha1($token);

$connect_query = "INSERT INTO
        `user_connections`
    SET
        `token` = '$token',
        `user_id` = {$data['id']},
        `created` = NOW(),
        `ip_address` = '{$_SERVER['REMOTE_ADDR']}'
";

$connect_result = mysqli_query($conn, $connect_query);

if (!$connect_result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Cannot log in: connection not saved.');
};

$output['success'] = true;
$output['username'] = $data['last_name'];
$output['token'] = $token;

print(json_encode($output));