<?php

require('../vendor/autoload.php');

$AWS_ACCESS_KEY_ID = 'AKIAUND4NIQBQXYU4U6X';
$AWS_SECRET_ACCESS_KEY = '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';

use Aws\S3\S3Client;

use Aws\Exception\AwsException;

$bucket = 'myster-travel-images';
$key = 'about-us';

$sharedConfig = [
    'region' => 'us-west-1',
    'version' => 'latest'
];

$s3Client = new S3Client($sharedConfig);

try {
    $result = $s3Client -> getObject([
        'Bucket' => $bucket,
        'Key' => $key
    ]);

    header("Content-Type: {$result['ContentType']}");
    echo $result['Body'];
} catch (S3Exception $e) {
    echo $e -> getMessage() . PHP_EOL;
};

print('hello');

// print_r($result);