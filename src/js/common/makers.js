class Makers {

    constructor() {
        this.WindowListen = window.WindowListen
        // var offset = $('.page_select_out').offset();
        // var pageSelectTop = offset.top;
        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 25,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            initialSlide:1,
        });
        // this.WindowListen.on('scroll', (windowTop) => {
        //     // console.log(windowTop,pageSelectTop);
        //     if (windowTop > pageSelectTop) {
        //         $('.makers_header').addClass('ON');
        //     }else{
        //         $('.makers_header').removeClass('ON');
        //     }
        // })
        this.WindowListen.on('resize', ()=>{
            this.resizeSwiper();
        })
    }
    updateSwiper(){
        // console.log(!this.swiper.length);
        if (!this.swiper.length) {
            //只有一筆 格式是object
            this.swiper.update();
        }else{
            //有多筆 格式是array
            for (let i = 0; i < this.swiper.length; i++) {
                let element = this.swiper[i];
                element.update();
            }
        }
    }
    resizeSwiper(){
        if (!this.swiper.length) {
            //只有一筆 格式是object
            this.swiper.onResize();
        }else{
            //有多筆 格式是array
            for (let i = 0; i < this.swiper.length; i++) {
                let element = this.swiper[i];
                element.onResize();
            }
        }
    }
}

module.exports = new Makers();