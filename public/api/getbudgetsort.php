<?php

ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE ^ PHP_OUTPUT_HANDLER_REMOVABLE);
require_once('checkloggedin.php');
ob_end_clean();

require_once('config.php');

if (!empty($_SESSION['user_data']['trips_id'])) {
    $trips_id = intval($_SESSION['user_data']['trips_id']);
};

if (empty($trips_id)) {
    throw new Exception('Please provide trips_id (int) with your request');
};

$output = [
    'success' => false
];

$type = $_GET['type'];
$order = '';

switch ($_GET['type']) {
    case 'Most expensive':
        $type = 'price';
        $order = 'DESC';
        break;
    case 'Least expensive':
        $type = 'price';
        $order = 'ASC';
        break;
    case 'Newest':
        $type = 'added';
        $order = 'DESC';
        break;
    case 'Oldest':
        $type = 'added';
        $order = 'ASC';
        break;
    case 'Category':
        $type = 'category';
        $order = 'ASC';
        break;
    default:
        $type = 'added';
        $order = 'DESC';
        break;
};

$query = "SELECT
        `price`, `category`, `description`, `id`, `added`, `updated`,
        (SELECT SUM(`price`)
        FROM `budget`
        WHERE `trips_id` = $trips_id) AS `total_budget`
    FROM `budget`
    WHERE `trips_id` = $trips_id
    ORDER BY `$type` $order
";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (mysqli_num_rows($result) === 0) {
    throw new Exception('Unable to sort budget entries.');
};

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'budget_id' => $row['id'],
        'description' => $row['description'],
        'category' => $row['category'],
        'price' => $row['price'],
        'added' => $row['added'],
        'updated' => $row['updated']
    ];
    
    $output['total_expense'] = (int)$row['total_budget'];
};

$output['success'] = true;
$output['budget'] = $data;
 
print(json_encode($output));
