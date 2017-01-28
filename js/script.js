$(document).ready(function(){
	$('.menu a').on('click',function(){
		var divId = $(this).attr('data-link');
		var newContent = $('#' + divId).html();
		$('#content').html(newContent);
		return false;
	});
});
