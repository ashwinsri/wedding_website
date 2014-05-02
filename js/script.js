
$(".container").css('display', 'none');

$(document).ready(function () {
	$.post("test.php", { filename: "left_pane.xml" })
	.done(function (data) 
	{
		$(".container").html(data);
		$(this).waitBGLoad();
		$(this).enPageFns();
	})
	.fail(function(jqXHR, textStatus, errMsg) 
	{
		$(".container").html(textStatus);
	});
});

/*******************************************
Name: waitBGLoad
Args: --
Desc: Displays content only after background loads
*******************************************/
$.fn.waitBGLoad = function()
{
	// create a dummy image
	var img = new Image();

	// give it a single load handler
	$(img).one('load',function() {
		$(".container").fadeIn('slow'); // fade in the elements when the image loads
	});

	// src of background image
	img.src = "../pics/export-11.jpg";

	// make sure if fires in case it was cached
	if( img.complete )
		$(img).load();
}

/*******************************************
Name: enPageFns
Args: --
Desc: Enable interactive features.
*******************************************/
$.fn.enPageFns = function()
{
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

	$('#home').click(function () 
	{
		$('.content').fadeOut('fast', function () 
		{
			$('.content').css('background-color', 'rgba(0,0,0,0)');
			$(this).empty().attr('class','content');
		});
	});

	$('#pics').click(function () 
	{
	    $(document).getContent('carousel.xml', 'content');
		$('.content').attr('class','content pics')
	});
    
	$('#rsvp').click(function () {
	    $(document).getContent('rsvp.xml', 'content');
		$('.content').attr('class','content rsvpform');
	});
	
	$('#info').click(function () {
	    $(document).getContent('attractions.xml', 'content');
		$('.content').attr('class','content attractions');
	});
	
	$('#story').click(function () {
	    $(document).getContent('story.xml', 'content');
		$('.content').attr('class','content lauustory');
	});
	
	$('#sched').click(function () {
	    $(document).getContent('wedding.xml', 'content');
		$('.content').attr('class','content weddingsched');
	});
	
	$('#gb').click(function () {
	    $(document).getContent('guestbook.xml', 'content');
		$('.content').attr('class','content guestbook');
	});
	
	
}


/*******************************************
Name: getContent
Args: file
Desc: Generic content-get function. Saves 
content to div defined by 'element' class.
*******************************************/
$.fn.getContent = function(file, element)
{
	var classname = '.'+element;
	$.post("test.php", { filename: file })
	.done(function (data) 
	{
		$(classname).css('background-color', 'rgba(0,0,0,0.7)').html(data.toString()).fadeIn('fast');
	})
	.fail(function(jqXHR, textStatus, errMsg) 
	{
		$(classname).css('background-color', 'rgba(0,0,0,0.7)').html(errMsg).fadeIn('fast');
	});
}