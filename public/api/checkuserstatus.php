<?php
require_once('config.php');

$query = "SELECT `full_name`, `is_guest`
    FROM `users`
    WHERE `id` = ?
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'd', $users_id);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    $output['success'] = true;
    $output['login'] = false;

    print(json_encode($output));
    exit();
}

$user = mysqli_fetch_assoc($result);

if((int)$user['is_guest'] === 0){
    $output['username'] = $user['full_name'];
    $output['is_guest'] = false;
    $_SESSION['user_data']['is_guest'] = false;
} else {
    $output['username'] = null;
    $output['is_guest'] = true;
    $_SESSION['user_data']['is_guest'] = true;
}

?>
