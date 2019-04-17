<?php

require_once('config.php');

$query = "SELECT * FROM `about_us`";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception(mysqli_error($conn));
};

if (!$result) {
    throw new Exception('About Us information not provided.');
};

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'last_name' => $row['last_name'],
        'first_name' => $row['first_name'],
        'email' => $row['email'],
        'linkedin' => $row['linkedin'],
        'portfolio' => $row['portfolio'],
        'github' => $row['github'],
        'image' => $row['image'],
        'developer_story' => $row['developer_story']
    ];
};

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));