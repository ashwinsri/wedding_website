$(document).ready(function()
{
	/*Testing jQuery script*/
	$.getScript( "js/okshadow.min.js", function( data, textStatus, jqxhr ) 
	{
		console.log("This should be fun!");
		$("#placeholder").okshadow();
	});
});