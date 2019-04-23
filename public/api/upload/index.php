<?php

require('../vendor/autoload.php');

$accessKey = 'AKIAUND4NIQBQXYU4U6X';
$secret = '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';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucket = 'myster-travel-images';
$keyname = 'about-us/jen.jpg';



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
    header("Content-Type: {$result['ContentType']}");
    echo $result['Body'];
} catch (S3Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}

// $result = $s3 -> listObjects(array('Bucket' => $bucket));

echo "Success = true.";