<?php

require_once('config.php');

if(!empty($_SESSION['user_data'])){
    $token = $_SESSION['user_data']['token'];
} else {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if(empty($input['token'])){
        throw new Exception('Please provide a token');
    }
    $token = $input['token'];
}

$check_login_query = "SELECT *
    FROM `user_connections`
    WHERE `token` = ?
";

$statement = mysqli_prepare($conn, $check_login_query);
mysqli_stmt_bind_param($statement, 's', $token);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) !== 1){
    throw new Exception('You are not logged in');
}

$data = mysqli_fetch_assoc($result);

if(!empty($_SESSION['user_data'])){
    $_SESSION['user_data'] = [
        'id' => $data['users_id'],
        'token' => $data['token']
    ];
}

$output['success'] = true;

print(json_encode($output));
?>
