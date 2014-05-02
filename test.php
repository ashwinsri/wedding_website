<?php
ini_set('display_errors',1); 

error_reporting(E_ERROR | E_PARSE);

$file = $_POST['filename'];
$filepath = 'content/'.$file;
$xml = file_get_contents($filepath);
if($xml === false) 
{
	echo 'Failed to open content';
}
else
{
	echo $xml;
}
?>