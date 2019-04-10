if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/newsdetail.pug');
    require('!!raw-loader!../html/EN/newsdetail.pug');
    require('./master.dev');
}

require('../html/CH/newsdetail.pug');
require('../html/EN/newsdetail.pug');
require('../css/newsdetail.scss');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');
require('../lib/flickResize');


$(() => {
    const WindowListen = window.WindowListen;
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/service');
    require('./common/fixed_service');
    // WindowListen.on('resize', (windowSTop) => {
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect: 'fade',
        // 'speed':1000,
        // 'autoplay':'1000',
        'fade': {
            'crossFade': true
        },
        breakpoints: {}
    });
    // })

    gaInit();
})

function gaInit() {
    $('.report_change_out .report_change .left .last_page,.report_change_out .report_change .left a').on('click', (e) => {
        gaEvent('newsdetail', 'news_prev');
    });
    $('.report_change_out .report_change .right .next_page,.report_change_out .report_change .right a').on('click', (e) => {
        gaEvent('newsdetail', 'news_next');
    });
    $('.newsdetail .content .container .report_title_out .fb').on('click', (e) => {
        gaEvent('newsdetail', 'btn_fb_share');
    });
    $('.newsdetail .content .container .report_title_out .line').on('click', (e) => {
        gaEvent('newsdetail', 'btn_line_share');
    });
}
