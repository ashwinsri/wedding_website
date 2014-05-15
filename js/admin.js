$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "rsvpChennai.xml",
        dataType: "xml",
        success: xmlParser
    });
});

function xmlParser(xml) {
	
	var table = $('<table id="ChennaiRSVPTable" class="table table-bordered"></table>');
	var tableHeader = $('<thead><tr><th>Name</th><th>E-Mail</th><th>Attending</th><th>Accommodation</th><th>Guests</th></tr></thead>');
	
	table.append(tableHeader);
	
	var tableBody = $('<tbody></tbody>');
	
	$(xml).find('entry').each(function()
	{
		var	tableRowEntry = $('<tr></tr>');
		tableRowEntry.append('<td>'+$(this).find('name').text()+'</td>');
		tableRowEntry.append('<td>'+$(this).find('email').text()+'</td>');
		tableRowEntry.append('<td>'+(($(this).find('attending').text() == '0')?'No':'Yes')+'</td>');
		tableRowEntry.append('<td>'+(($(this).find('accommodation').text() == '0')?'No':'Yes')+'</td>');
		tableRowEntry.append('<td>'+$(this).find('guests').text()+'</td>');
		
		tableBody.append(tableRowEntry);
	});
	
	table.append(tableBody).css('background-color','#400040').css('border-radius','25px').css('color','white').css('border', '2px').css('font-weight','strong');
	
	setTimeout(function() 
	{
		$('.admin_content').append(table);
	}, 2000);
}