<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if(!empty($_SESSION['user_data']['trips_id'])){
    $trips_id = intval($_SESSION['user_data']['trips_id']);
}

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
}

$query = "SELECT *,
    (SELECT SUM(`price`)
    FROM `budget`
    WHERE `trips_id` = $trips_id)
    AS 'total_budget'
    FROM `budget`
    WHERE `trips_id` = $trips_id
    ORDER BY `added` DESC
";

$result = mysqli_query($conn, $query);

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
        'added' => date("m/d/Y H:i:s", strtotime($row['added'])),
        'updated' => $row['updated']
    ];

    $output['total_expense'] = (int)$row['total_budget'];
}

$output['success'] = true;
$output['budget'] = $data;

print(json_encode($output));

?>
