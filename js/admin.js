var containerDiv = $('<div class = "containerDiv"></div>');

$(document).ready(function () {
	$(this).enableAdminFns();
});

$.fn.enableAdminFns = function()
{
	// Disable caching of AJAX responses
	$.ajaxSetup(
	{
		cache: false
	});
	
	$('li').hover(function()
	{	
		$(this).css('cursor', 'pointer');
		$(this).css('font-weight', 'bold');
	}, 
	function() 
	{
		$(this).css('cursor', 'default');
		$(this).css('font-weight', 'normal');
	});
	
	$('#chennai_entries').click(function() {
		
		$('.admin_content').empty();
		$('#seattle_entries').css('font-weight', 'normal').css('text-decoration','none');
		$(this).css('font-weight', 'bold').css('text-decoration','underline');
		$(this).getRSVPXML();
	});
	
	$('#seattle_entries').click(function() {
		
		$('.admin_content').empty();
		$('#chennai_entries').css('font-weight', 'normal').css('text-decoration','none');
		$(this).css('font-weight', 'bold').css('text-decoration','underline');
		$(this).getRSVPXML();
	});
	
	
}

$.fn.getRSVPXML = function()
{
	var urlData;
	if($(this).attr('id') == 'chennai_entries')
	{
		urlData = 'rsvpChennai.xml';
	}
	else if($(this).attr('id') == 'seattle_entries')
	{
		urlData = 'rsvpSeattle.xml';
	}

	$.ajax({
        type: "GET",
        url: urlData,
        dataType: "xml",
        success: xmlParser
    });
}

function xmlParser(xml) {
	
	var totalResponses = 0, totalAttending = 0, totalAccomm = 0;
	var tableID = $(this).attr('id');
	
	var table = $('<table id="' + tableID + '" class="table table-bordered table-condensed"></table>');
	var tableHeader = $('<thead><tr><th>Name</th><th>E-Mail</th><th>Attending</th><th>Accommodation</th><th>Guests</th></tr></thead>');
	
	table.append(tableHeader);
	
	var tableBody = $('<tbody></tbody>');
	var statsDiv = $('<br><div id = "stats"></div>');
	var containerDiv = $('<div class = "containerDiv"></div>'); 
	$(xml).find('entry').each(function()
	{
		totalResponses++;
		var	tableRowEntry = $('<tr></tr>');
		tableRowEntry.append('<td>'+$(this).find('name').text()+'</td>');
		tableRowEntry.append('<td>'+$(this).find('email').text()+'</td>');
		tableRowEntry.append('<td>'+(($(this).find('attending').text() == '0')?'No':'Yes')+'</td>');
		tableRowEntry.append('<td>'+(($(this).find('accommodation').text() == '0')?'No':'Yes')+'</td>');
		tableRowEntry.append('<td>'+$(this).find('guests').text()+'</td>');
		
		tableBody.append(tableRowEntry);
		
		/*Stats*/
		if($(this).find('attending').text() == '1')
		{	
			totalAttending+=parseInt($(this).find('guests').text());
			
			//If attendee requires accommodation
			if($(this).find('accommodation').text() == '1')
			{
				totalAccomm += parseInt($(this).find('guests').text());
			}
		}
	});
	
	table.append(tableBody).css('background-color','#400040').css('border-radius','5px').css('color','white').css('border', '0px').css('font-weight','strong');
	
	setTimeout(function() 
	{
		$('.admin_content').append(table).fadeIn("slow");
		setTimeout(function() {
		$('.admin_content').append('<div id="stats">Total Responses = '+totalResponses+'<br>Attending = '+totalAttending+'<br>Total people needing accommodation= '+totalAccomm+'<br></div>').fadeIn("slow");
		}, 100);
	}, 500);
}