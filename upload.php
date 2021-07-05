<?php print_r($_FILES);
$tmpfile = $_FILES['file'];
print_r($tmpfile);

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// Instantiate an Amazon S3 client.
$s3 = new S3Client([
        'credentials' => [
        'key'    => 'AKIA3WTOPERPQ4P26X5I',
        'secret' => 'jIQzJdZxXucD1YpvRnW9Yq8jV/Pwr32WFOG5tmDn',
        ],
    'version' => 'latest',
    'region'  => 'us-east-1'
]);

 $key = str_replace(".","-".rand(1,9999).".",$tmpfile['name']);

try {
    $result = $s3->putObject([
        'Bucket' => 'audiowordvoyage',
        'Key'    => $key,
        'SourceFile' => $tmpfile['tmp_name'],
        'ACL'    => 'public-read',
    ]);
    return $result['ObjectURL'];
    print_r($result['ObjectURL']);
} catch (Aws\S3\Exception\S3Exception $e) {
    echo "There was an error uploading the file.\n";
}
?>;