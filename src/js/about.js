if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/about.pug');
    require('!!raw-loader!../html/EN/about.pug');
    require('./master.dev');
}

require('../html/CH/about.pug');
require('../html/EN/about.pug');

require('../css/about.scss');

require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');

const WindowListen = window.WindowListen;

$(window).on('load', e => {
    require('./common/makers');
});
$(() => {

    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./common/service');
    require('./common/fixed_service');
    require('./master/makersHeader');

    var firstContainerTop = $('.first_container').offset().top - 120;

    $('.more_btn').on('click', (e) => {
        $("html, body").animate({
            scrollTop: firstContainerTop
        }, 1000, 'easeOutCubic');
        gaEvent('about', 'about_more');
    });
    WindowListen.on('resize', () => {
        var firstContainerTop = $('.first_container').offset().top - 120;
    })
})