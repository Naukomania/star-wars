$(document).ready(function(){
	$('#stage').on('click', function(e){
		console.log(e);
		var x = e.pageX;
		var y = e.pageY;
		var lukeHeight = parseInt($("#luke").css('height'));
		var lukeWidth = parseInt($("#luke").css('width'));
		$('#luke').animate({
			top: e.pageY - lukeHeight/2 + 'px',
			left: e.pageX - lukeWidth/2 + 'px'
		},1000, 'swing', function() {
			$('#djeday').animate({
				top: e.pageY - lukeHeight/2 + 'px',
				left: e.pageX + lukeWidth/2 + 'px'
			},1000, 'swing');
		});
	});
});