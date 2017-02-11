$(document).ready(function(){
 $('#stage2').on('click', function(){
    $('body')
        .css('background-image', 'url(images/stars-sky.png)')
        .animate({
            'background-position-y': '1200px'
        },5000, 'swing', function(){
            $(this).css({
                'background-image':'none',
                'background-color':'black'
            }).animate({
                'background-color':'white'
            },1000);
        });
    });
});