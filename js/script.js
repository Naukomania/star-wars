$(document).ready(function(){
	$('.menu a').on('click',function(){
        var url = $(this).attr('href');
        $.ajax({
            url: url, 
            success: function(returnhtml){                          
                $("#content").html(returnhtml);                     
            }           
        });
		return false;
	});
});
