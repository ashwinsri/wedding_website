$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "rsvpChennai.xml",
        dataType: "xml",
        success: xmlParser
    });
});

function xmlParser(xml) {
	
	var OrderedListNames = $('<ol id="names"></ol>');
	
	$(xml).find('entry').each(function()
	{
		var	OrderedListEntry = $('<li></li>');
		console.log($(this).find('name').text());
		OrderedListEntry.append($(this).find('name').text());
		OrderedListNames.append(OrderedListEntry);
	});
	
	console.log(OrderedListNames);
	
	$('.contain').append(OrderedListNames);
}