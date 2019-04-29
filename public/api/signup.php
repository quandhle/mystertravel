<?php

require_once('config.php');

$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$name = $input['nickname'];
$email = $input['email'];
$password = $input['password'];

if (empty($name)) {
    throw new Exception('Please enter a display name');
}

if (empty($email)) {
    throw new Exception('Please enter an email');
}

if (empty($password)) {
    throw new Exception('Please enter a password');
}

$hashedPassword = sha1($password);
unset($password);

$check_query = "SELECT * FROM `users` WHERE `email` = ?";

$statement = mysqli_prepare($conn, $check_query);
mysqli_stmt_bind_param($statement, 's', $email);
mysqli_stmt_execute($statement);
$result = mysqli_stmt_get_result($statement);
$row = mysqli_fetch_assoc($result);

if ($row) {
    throw new Exception('User already exists.');
} else {
    $query = "INSERT INTO `users` SET
        `full_name` = ?,
        `email` = ?,
        `password` = ?,
        `is_guest` = 0
    ";

    $statement = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($statement, 'sss', $name, $email, $hashedPassword);
    $result = mysqli_stmt_execute($statement);

    if(!$result){
        throw new Exception(mysqli_error($conn));
    }

    if(mysqli_affected_rows($conn) !== 1){
        throw new Exception('Unable to sign up');
    }

    require_once('login.php');
}

?>
