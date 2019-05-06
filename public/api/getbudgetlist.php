<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if(!empty($_SESSION['user_data']['trips_id'])){
    $trips_id = $_SESSION['user_data']['trips_id'];
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT *,
	(SELECT SUM(`price`)
     FROM `budget`
     WHERE `trips_id` = ?)
    AS 'total_budget'
    FROM `budget`
    WHERE `trips_id` = ?
    ORDER BY `added` DESC
";

$statement = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($statement, 'dd', $trips_id, $trips_id);
mysqli_stmt_execute($statement);

$result = mysqli_stmt_get_result($statement);

if (!$result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    $output['success'] = true;
    $output['budget'] = [];
    print(json_encode($output));
    exit();
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'budget_id' => $row['id'],
        'description' => $row['description'],
        'category' => $row['category'],
        'price' => $row['price'],
    ];
    $output['total_expense'] = (int)$row['total_budget'];
}

$output['success'] = true;
$output['budget'] = $data;

print(json_encode($output));

?>
