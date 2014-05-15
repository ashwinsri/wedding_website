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
		
		$('#seattle_entries').css('font-weight', 'normal').css('text-decoration','none');
		$(this).css('font-weight', 'bold').css('text-decoration','underline');
		$(this).getRSVPXML();
		//$('.admin_content').attr('class', 'col-lg-9 col-md-9 col-sm-9 col-xs-9 admin_content');
	});
	
	$('#seattle_entries').click(function() {
		
		$('#chennai_entries').css('font-weight', 'normal').css('text-decoration','none');
		$(this).css('font-weight', 'bold').css('text-decoration','underline');
		$(this).getRSVPXML();
		//$('.admin_content').attr('class', 'col-lg-9 col-md-9 col-sm-9 col-xs-9 admin_content');
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
	
	var tableID = $(this).attr('id');
	
	var table = $('<table id="' + tableID + '" class="table table-bordered table-condensed"></table>');
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
	
	table.append(tableBody).css('background-color','#400040').css('border-radius','5px').css('color','white').css('border', '0px').css('font-weight','strong');
	
	setTimeout(function() 
	{
		$('.admin_content').html(table);
	}, 500);
}