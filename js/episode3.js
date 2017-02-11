$(document).ready(function(){
    var startFlag = 0;
    $('#stage2').append('<img src="images/darklord.png" class="character" id="darklord">');
    $('#stage2').on('click', function(e) {
        if (startFlag) {
            return false;
        }
        startFlag = 1;
        var x = e.pageX;
        var y = e.pageY;
        var lordHeight = parseInt($("#darklord").css('height'));
        var lordWidth = parseInt($("#darklord").css('width'));
        $('#darklord').css({
            top: e.pageY - lordHeight/2 + 'px',
            left: e.pageX - lordWidth/2 + 'px' 
        }).animate({
        opacity: 1, 
        }, 1000, 'swing', function(){
            $('#darklord').animate({
                opacity: 0
            },1000,'swing', function(){
                startFlag = 0;
            });
        });

    });
});