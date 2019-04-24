<?php

require_once(__DIR__ . '/../vendor/autoload.php');
require_once('key.php');

$accessKey = $aws_acess_key_id;
$secret = $aws_secret_access_key;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucketName = 'myster-travel-images';
$keyName = 'notes-images/trips_id=' . $trips_id . '/' . basename($_FILES["image"]['name']);

try {
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
} catch (S3Exception $e) {
    die("Error: " . $e -> getMessage());
};

try {
    $url = $s3 -> getObjectUrl($bucketName, $keyName);
} catch (S3Exception $e) {
    die('Error:' . $e->getMessage());
}

?>
