<?php

require_once('config.php');

$query = 'SELECT `list_name`, `list_code` FROM `countries`';

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
};

if(mysqli_num_rows($result) === 0){
    throw new Exception('Unable to retrieve country list');
};

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = [
        'country_name' => $row['list_name'],
        'country_code' => $row['list_code']
    ];
};

$output['success'] = true;
$output['data'] = $data;

print(json_encode($output));

?>
