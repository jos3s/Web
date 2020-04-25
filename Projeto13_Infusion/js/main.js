(function (){
    var $body=document.querySelector('body');
    $body.classList.remove('no-js');
    $body.classList.add('js');

    var menu=new Menu({
        container:".header__nav",
        toggleBtn:".header__btnMenu",
        widthEnabled:980
    });

    var carousel=new Carousel({
        container: '.laptop-slide .slideshow',
        itens: 'figure',
        btnPrev: '.prev',
        btnNext: '.next'
    });

})();