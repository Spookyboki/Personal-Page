
$('document').ready(function(){

    contactBtn = $('.contact-btn');
    formBox = $('.form-box');
    closeBtn = $('.close');

    contactBtn.on('click' , function(){
        formBox.stop().slideDown();
    })

    closeBtn.on('click' , function(){
        formBox.stop().slideUp();
    })


    boxClose = $('.box-close');
    shape = $('.shape');
    openedBox = $('.opened-box');
    box = $('.popup');

    shape.on('click', function(){
        openedBox.show(500);
        box.show(1000);
        
    })

    arrow = $('.arrow');
    arrow.on('click', function(){
        openedBox.hide(500);
        box.hide();
    })

    








});