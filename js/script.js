$(document).ready(function () {

    $.post("test.php", { filename: "left_pane.xml" })
.done(function (data) {
    $(".container").html(data);

 $('li').hover(
		function()
		{	
			$(this).css('cursor', 'pointer');
			$(this).css('font-weight', 'bold');
		}, 
		function() 
		{
			$(this).css('cursor', 'default');
			$(this).css('font-weight', 'normal');
		}
	);

 $('#home').click(function () {
     $('.content').fadeOut('fast', function () {
         $('.content').css('background-color', 'rgba(0,0,0,0)');
         $(this).empty();
     });
 });

 $('#pics').click(function () {
     $('.content').css('background-color', 'rgba(0,0,0,0.7)');
     $('.content').append(' \
			<ul class "thumbnails">\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_1271.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_0002.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_1687.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_1688.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_1689.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_1750.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_2658.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_3028.jpg" />\
				</div>\
				<div class = "thumbs">\
					<img src = "pics/thumb_IMG_3029.jpg" />\
				</div>\
			</ul>\
			');
     $('.content').fadeIn('fast');
 });





});

   

       
	
	


});