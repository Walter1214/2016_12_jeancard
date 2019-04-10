class PageTheme {
    constructor() {
        
        this.WindowListen = window.WindowListen;
        this.WindowListen.on('scroll', (_windowSTop) => {
        //     this.scrollTopImgToBlack(_windowSTop);
            if(_windowSTop > 500 ){
                $('.page_theme').css('position', 'static');
            }else{
                if (device.desktop()) {
                    $('.page_theme').css('position', 'fixed');
                }else{
                    $('.page_theme').css('position', 'relative');
                }
                
            }
        })
         this.WindowListen.onScroll();
    }
    scrollTopImgToBlack(windowSTop) {
        var ratio = windowSTop / $('.page_theme').height();
        var result = ratio > 1 ?  1 :  1-(ratio *1);
        $(".page_theme").css('opacity', result);
    }
}

module.exports = new PageTheme();