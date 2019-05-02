<?php

require_once('config.php');

if(!empty($_SESSION['user_data'])){
    $token = $_SESSION['user_data']['token'];
} else {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if(empty($input['token'])){
        $output['success'] = true;
        $output['login'] = false;

        print(json_encode($output));
        exit();
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

if(mysqli_num_rows($result) === 0){
    $output['success'] = true;
    $output['login'] = false;

    print(json_encode($output));
    exit();
}

$data = mysqli_fetch_assoc($result);
$users_id = $data['users_id'];
$token = $data['token'];

if(!empty($_SESSION['user_data'])){
    $_SESSION['user_data'] = [
        'users_id' => $users_id,
        'token' => $token
    ];
}

require_once('checkactivetrip.php');

require_once('checkuserstatus.php');

$output['success'] = true;
$output['login'] = true;
$output['token'] = $token;

print(json_encode($output));
?>
