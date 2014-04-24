<?php
ini_set('display_errors',1); 
 error_reporting(E_ALL);

//$name = $_POST['name'];
//$date = $_POST['time'];
//$file = $_POST['filename'];
//$filepath = 'content/'.$file;
$xml = file_get_contents('content/left_pane.xml');

echo $xml;
?>