const $bg = $('.top_bg');

class TopImg {
    constructor() {
        this.index = $bg.length - 1;
        this.max = $bg.length;
        this.WindowListen = window.WindowListen;
        this.topImgHeight = $('.top_img').height();
        this.newsEventTop =$('.news_events').offset().top;
        this.init();
        this.WindowListen.on('scroll', (_windowSTop) => {
            this.scrollTopImgToBlack(_windowSTop);

            if(_windowSTop>= 10){
                $('.top_img .logo').fadeOut(1000);
                $('.top_img .links').fadeOut(1000);
            }else{
                $('.top_img .logo').fadeIn(1000);
                $('.top_img .links').fadeIn(1000);
            }
        })

        this.WindowListen.on('resize', () => {
            this.newsEventTop =$('.news_events').offset().top;
        })
        
        $('.see_more').on('click', () => {
            $("html, body").animate({
                scrollTop: this.newsEventTop
            }, 1000, 'easeOutCubic');
            gaEvent('index', 'banner_menu');
        });
    }

    init() {
        // $('.essay').addClass('ON');
        this.fadeInOut();
        this.scrollTopImgToBlack();
        this.setTextAnimation();
        setTimeout(() => {
            $('.essay').addClass('ON');
        }, 1000);
    }

    fadeInOut() {
        // if (!isNaN(this.interval)) clearTimeout(this.interval);
        // if (++this.index >= this.max) this.index = 0;
        // $bg.eq(this.index).addClass('OFF').siblings().removeClass('OFF');
        // this.interval = setTimeout(() => {
        //     this.fadeInOut();
        // }, 7000);
        // console.log(this.index, this.max, this.index / this.max);
        $bg.eq(this.index).removeClass('OFF');
        if (this.index == this.max - 1) {
            this.index = 0;
        } else {
            this.index++;
        }
        $bg.eq(this.index).addClass('OFF');

        this.interval = setTimeout(() => {
            this.fadeInOut();
        }, 7000);

    }

    scrollTopImgToBlack(windowSTop) {
        var ratio = windowSTop / this.topImgHeight;
        var result = ratio > 1 ? 1 : ratio * 1;
        $(".bg_black").css('opacity', result);
    }

    setTextAnimation(){
        $.each($('.essay .content .text'),  (indexInArray, valueOfElement) => { 
                $element= $(valueOfElement);
                $element.addClass(`time_${indexInArray}`);
            console.log(indexInArray,$element);
        });
    }
}

module.exports = new TopImg();