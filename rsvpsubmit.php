<?php
$filename = "rsvpdata.xml";

if (file_exists($filename)) {
  // Load the rsvp entries from the XML file
  $rawFile = file_get_contents($filename);
}
else {
  // Create an empty XML document
  $rawFile = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
$rawFile .= "<RSVPEntries></RSVPEntries>;

}
$xml = new SimpleXmlElement($rawFile);

// Add the new rsvp entry as a child node
$entry = $xml->entries->addChild("entry");
$entry->addChild("name", $_POST["name"]);
$entry->addChild("attending", $_POST["attending"]);
$entry->addChild("guests", $_POST["guests"]);
$entry->addChild("accommodation", $_POST["accommodation"]);
$entry->addChild("arrivaldate", $_POST["arrivaldate"]);
$entry->addChild("departuredate", $_POST["departuredate"]);

// Write the entire blog to the file
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>
