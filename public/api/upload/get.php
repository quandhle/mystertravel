<?php

require('../vendor/autoload.php');
require('key.php');

$accessKey = $aws_acess_key_id;
$secret = $aws_secret_access_key;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;


//query database first to get keyname

$bucket = 'myster-travel-images';
$keyname = 'about-us/kylie.jpg';

// try {
//     $s3 = S3Client::factory(
//         array(
//             'credentials' => array(
//                 'key' => $accessKey,
//                 'secret' => $secret
//             ),
//             'version' => 'latest',
//             'region' => 'us-west-1'
//         )
//     );
// } catch (S3Exception $e) {
//     die("Error: " . $e -> getMessage());
// };

$s3 = S3Client::factory(
    array(
        'credentials' => array(
            'key' => $accessKey,
            'secret' => $secret
        ),
        'version' => 'latest',
        'region' => 'us-west-1'
    )
);

try {
    // Get the object.
    $result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $keyname
    ]);
    // Display the object in the browser.
    $url = $s3 -> getObjectUrl($bucket, $keyname);
    // header("Content-Type: {$result['ContentType']}");
    // echo $result['Body'];
    echo $url;
    // print($url);
} catch (S3Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}

// $result = $s3 -> listObjects(array('Bucket' => $bucket));
