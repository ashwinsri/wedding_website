<?php

$filename = $_POST["id"]. ".xml";

if (file_exists($filename)) 
{
  $rawFile = file_get_contents($filename);
}
else 
{
  $rawFile = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
$rawFile .= "<RSVPEntries><entries></entries></RSVPEntries>";
}

$xml = new SimpleXmlElement($rawFile);

// Add the new rsvp entry as a child node
$entry = $xml->entries->addChild("entry");
$entry->addChild("name", $_POST["name"]);
$entry->addChild("email", $_POST["email"]);
$entry->addChild("attending", $_POST["attending"]);
$entry->addChild("guests", $_POST["guests"]);
$entry->addChild("accommodation", $_POST["accommodation"]);

//Format XML (hopefully) - AS
$xml->formatOutput = TRUE;
$xml->saveXml();

// Write the entire blog to the file
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);

echo 'thank you for RSVP-ing!';
?>