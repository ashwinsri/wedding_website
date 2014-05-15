var RSVPTemplate = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><RSVPEntry></RSVPEntry>";
var RSVPChennai = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><RSVPEntry></RSVPEntry>";
var RSVPSeattle = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><RSVPEntry></RSVPEntry>";

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
			$(this).empty().attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash');
		});
	});

	$('#pics').click(function () 
	{
	    $(document).getContent('carousel.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash pics')
	});
    
	$('#rsvp').click(function () {
	    $(this).getContent('rsvp.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash rsvpform');
	});
	
	$('#info').click(function () {
	    $(document).getContent('attractions.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash attractions');
	});
	
	$('#story').click(function () {
	    $(document).getContent('story.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash lauustory');
	});
	
	$('#sched').click(function () {
	    $(document).getContent('wedding.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash weddingsched');
	});
	
	$('#gb').click(function () {
	    $(document).getContent('guestbook.xml', 'content');
		$('.content').attr('class','col-lg-9 col-md-9 col-sm-9 col-xs-9 content flash guestbook');
	});
}


/*******************************************
Name: getContent
Args: file
Desc: Generic content-get function. Saves 
content to div defined by 'element' class.
*******************************************/
$.fn.getContent = function(file, element) {
    var classname = '.' + element;
    $.post("test.php", { filename: file })
        .done(function(data) {
            $(classname).css('background-color', 'rgba(0,0,0,0.7)').html(data.toString()).fadeIn('fast');
        })
        .fail(function(jqXHR, textStatus, errMsg) {
            $(classname).css('background-color', 'rgba(0,0,0,0.7)').html(errMsg).fadeIn('fast');
        });
	
	if($(this).attr('id') == 'rsvp')
	{
		setTimeout(function()
		{
			$('#rsvp1').validateRSVPForm('#rsvpChennai');
			$('#rsvp2').validateRSVPForm('#rsvpSeattle');
		}, 1000);
	}
};


/*******************************************
Name: validateRSVPForm
Args: --
Desc: validates RSVP form data before sending.
*******************************************/
$.fn.validateRSVPForm = function(id)
{
	var name = false;
	var email = false;
	var guests = false;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	
	var str = "submit"+id.substring(5, 12);
	$(this).on('keyup', function()
	{
		var $Parent = $(this);
		console.log('Something changed.');
		
		//Checking Name
		if($(id + ' #fullname').val().length > 2)
		{
			console.log("I'm checking mail.");
			name = true;
			$(id + ' #fullname').css('background-color', '#D4FFFF');
		}
		else
		{
			console.log("I'm checking mail.");
			name = false;
			$(id + ' #fullname').css('background-color', '#FFD4D4');
			$(id).find("input[type='submit']").attr('class', str+'_Disabled').prop('disabled', true);
		}
		
		//Checking e-mail
		if(($(id + ' #email').val().length > 0))
		{
			console.log("I'm checking email.");
			if(emailReg.test($('#email').val()))
			{
				email = true;
				$(id + ' #email').css('background-color', '#D4FFFF');
			}
			else
			{
				email = false;
				$(id + ' #email').css('background-color', '#FFD4D4');
				$(id).find("input[type='submit']").attr('class', str+'_Disabled').prop('disabled', true);
			}
		}
		else
		{
			console.log("I'm checking email.");
			email = false;
			$(id + ' #email').css('background-color', '#FFD4D4');
			$(id).find("input[type='submit']").attr('class', str+'_Disabled').prop('disabled', true);
		}
		
		//Checking attending
		if($(id + ' #attend').find(":selected").val() == 0)
		{
			console.log("I'm checking attending");
			$(id + ' #accomm').prop("disabled", true);
		}
		else if($(id + ' #attend').find(":selected").val() == 1)
		{
			console.log("I'm checking attending");
			$(id + ' #accomm').prop("disabled", false);
		}
		
		//Checking guests
		if($(id + ' #guests').val().length > 0)
		{
			console.log("I'm checking guests.");
			if($.isNumeric($(id + ' #guests').val()))
			{
				guests = true;
				$(id + ' #guests').css('background-color', '#D4FFFF');
			}
			else
			{
				$(id + ' #guests').css('background-color', '#FFD4D4');
				guests = false;
				$(id).find("input[type='submit']").attr('class', str+'_Disabled').prop('disabled', true);
			}
		}
		else
		{
			console.log("I'm checking guests.");
			$(id + ' #guests').css('background-color', '#FFD4D4');
			guests = false;
			$(id).find("input[type='submit']").attr('class', str+'_Disabled').prop('disabled', true);
		}

		setTimeout(function()
		{
			if(name && email && guests)
			{
				$(window).keydown(function(event)
				{
					if(event.keyCode == 13)
					{
						event.preventDefault();
						return false;
					}
				});
				
				$(id).find("input[type='submit']").attr('class', str).prop('disabled', false);
				$(id).find("input[type='submit']").on('click', function()
				{
					$(id).find("input[type='submit']").unbind('click');
					setTimeout(function()
					{
						$(id).find("input[type='submit']").prop('disabled', true);
						$(id).find("input[type='submit']").attr('class', str+'_Disabled');
					}, 100);
				});
			}
		}, 100);
	});
}