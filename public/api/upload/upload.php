<?php

require_once (__DIR__ . '/../vendor/autoload.php');
require_once('key.php');

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucketName = 'myster-travel-images';
$accessKey = $aws_acess_key_id;
$secret = $aws_secret_access_key;

try {
    $s3 = S3Client::factory(
        array(
            'credentials' => array(
                'key' => $accessKey,
                'secret' => $secret
            ),
            'version' => 'latest',
            'region'  => 'us-west-1'
        )
    );
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}

$keyName = 'notes-images/trips_id=' . $trips_id . '/' . basename($_FILES["image"]['name']);
$pathInS3 = 'https://s3.us-west-1.amazonaws.com/' . $bucketName . '/' . $keyName;

try {
    $file = $_FILES["image"]['tmp_name'];
    $s3->putObject(
        array(
            'Bucket' => $bucketName,
            'Key' =>  $keyName,
            'SourceFile' => $file,
            'StorageClass' => 'REDUCED_REDUNDANCY'
        )
    );
} catch (S3Exception $e) {
    die('Error:' . $e->getMessage());
} catch (Exception $e) {
    die('Error:' . $e->getMessage());
}

?>
