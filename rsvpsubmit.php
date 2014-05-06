<?php

$filename = "rsvpdata.xml";

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
$entry->addChild("name", $_GET["name"]);
$entry->addChild("email", $_GET["email"]);
$entry->addChild("attending", $_GET["attending"]);
$entry->addChild("guests", $_GET["guests"]);
$entry->addChild("accommodation", $_GET["accommodation"]);
//$entry->addChild("arrivaldate", $_GET["arrivaldate"]);
//$entry->addChild("departuredate", $_GET["departuredate"]);

// Write the entire blog to the file
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);

echo 'thank you for RSVP-ing!';
?>