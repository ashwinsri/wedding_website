<?php
ini_set('display_errors',1); 
 error_reporting(E_ALL);


$file = $_POST['filename'];
$filepath = 'content/'.$file;
$xml = file_get_contents($filepath);

echo $xml;
?>