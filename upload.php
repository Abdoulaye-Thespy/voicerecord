<?php

function gen_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        // 32 bits for "time_low"
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

        // 16 bits for "time_mid"
        mt_rand( 0, 0xffff ),

        // 16 bits for "time_hi_and_version",
        // four most significant bits holds version number 4
        mt_rand( 0, 0x0fff ) | 0x4000,

        // 16 bits, 8 bits for "clk_seq_hi_res",
        // 8 bits for "clk_seq_low",
        // two most significant bits holds zero and one for variant DCE1.1
        mt_rand( 0, 0x3fff ) | 0x8000,

        // 48 bits for "node"
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}


 print_r($_FILES);
$tmpfile = $_FILES['file'];
print_r($tmpfile);

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// Instantiate an Amazon S3 client.
$s3 = new S3Client([
        'credentials' => [
        'key'    => 'AKIA3WTOPERPQ4P26X5I',
        'secret' => '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',
        ],
    'version' => 'latest',
    'region'  => 'us-east-1'
]);

$key= gen_uuid();


try {
    $result = $s3->putObject([
        'Bucket' => 'audiowordvoyage',
        'Key'    => $key,
        'SourceFile' => $tmpfile['tmp_name'],
        'ACL'    => 'public-read',
    ]);
    print_r($result['ObjectURL']);
} catch (Aws\S3\Exception\S3Exception $e) {
    echo "There was an error uploading the file.\n";
}

?>;