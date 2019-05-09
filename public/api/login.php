<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$email = $input['email'];
$password = $input['password'];

if (empty($email)) {
    throw new Exception('Please enter email.');
}

if (empty($password)) {
    throw new Exception('Please enter password.');
}

$hashedPassword = sha1($password);
unset($password);

$query = "SELECT `id`, `full_name`
    FROM `users`
    WHERE `email` = ?
    AND `password` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'ss', $email, $hashedPassword);
$query_result = mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) !== 1) {
    throw new Exception('Invalid email or password.');
}

$data = mysqli_fetch_assoc($result);
$users_id = $data['id'];
$token = $email . $users_id . microtime();
$token = sha1($token);

$connect_query = "INSERT INTO
        `user_connections`
    SET
        `token` = '$token',
        `users_id` = {$data['id']},
        `created` = NOW(),
        `ip_address` = '{$_SERVER['REMOTE_ADDR']}'
";

$connect_result = mysqli_query($conn, $connect_query);

if (!$connect_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_affected_rows($conn) !== 1) {
    throw new Exception('Cannot log in: connection not saved.');
}

$_SESSION['user_data'] = [
    'users_id' => $data['id'],
    'token' => $token,
    'is_guest' => false
];

require_once('checkactivetrip.php');

$output['success'] = true;
$output['login'] = true;
$output['is_guest'] = false;
$output['users_id'] = $data['id'];
$output['username'] = $data['full_name'];
$output['token'] = $token;

print(json_encode($output));

?>
