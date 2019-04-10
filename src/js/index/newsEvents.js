class NewsEvents {
    constructor() {
        this.offset = $('.news_events').offset();
        this.top = this.offset.top;
        this.bottom = $('.news_events').height() + this.top;
        this.isSendGA = false;
        this.WindowListen = window.WindowListen;
        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            // nextButton: 'swiper-button-next',
            // prevButton: 'swiper-button-prev',

            spaceBetween: 25,
            slidesPerView: 5,
            slidesPerGroup: 5,
            width: 1260,
            centeredSlides: false,
            paginationClickable: true,
            breakpoints: {
                1000: {
                    // slidesPerView: 1,
                    slidesPerGroup: 1,
                    slidesPerView: 1,
                    spaceBetween: 25,
                    centeredSlides: true,
                    slidesOffsetBefore: (640 - 465) / 2,
                    width: 465,
                },
                1440: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 25,
                    centeredSlides: false,
                    slidesOffsetBefore: 0,
                    width: 1000
                },
                // 1920: {
                //     slidesPerView: 5,
                //     slidesPerGroup: 5,
                //     spaceBetween: 25,
                //     width:1260,
                // }
            }
        });
        // $(window).on('swiper-resize', ()=>{
        //     setTimeout(()=>{
        //         this.swiper.onResize();
        //     },500)
        // });
        this.WindowListen.on('resize', (w, h) => {
            this.swiper.onResize();
            this.setGA();

            // $('.news_events .wrap .swiper-container .swiper-pagination .swiper-pagination-bullet').off('click',()=>{/)

            // $('.news_events .wrap .swiper-container .swiper-pagination .swiper-pagination-bullet').on('click', () => {
            //     gaEvent('index', 'news_point');
            // })            
        })

        this.gaInit();
    }
    gaInit() {
        $('.news_events .wrap .swiper-container .swiper-pagination').on('click', '.swiper-pagination-bullet', () => {
            gaEvent('index', 'news_point');
        });

        $('.news_events .wrap a').on('click', () => {
            gaEvent('index', 'news_more');
        });
    }
    sendGA(windowSTop) {

        // console.log(this.top, this.bottom, windowSTop);

        if (!this.isSendGA && (windowSTop + 100) > this.top && windowSTop < this.bottom) {
            gaPageView('index/#/news');
            this.isSendGA = true;
        }
    }
    setGA() {
        this.top = this.offset.top;
        this.bottom = $('.news_events').height() + this.top;
        this.isSendGA = false;
    }
}
module.exports = new NewsEvents();