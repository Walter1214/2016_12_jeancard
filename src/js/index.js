if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/index.pug');
    require('./master.dev');
}


require('../html/CH/index.pug');
require('../html/EN/index.pug');
require('../css/index.scss');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');
require('../asset/lib/jquery.mousewheel.min');
const WindowListen = window.WindowListen;
$(() => {
    const newsEvents = require('./index/newsEvents');
    require('./index/topImg');
    require('./index/value');
    const brandLink = require('./index/brandLink');
    require('./index/sticky');
    require('./common/service');

    let setTimeGA = -1;

    WindowListen.on('scroll', (windowSTop) => {
        let offset = $('.header').offset();
        let top = offset.top;
        let left = offset.left;

        if (top < windowSTop || WindowListen.isOpenMenu) {
            $('.header').children('.wrap').css('position', 'fixed');
            $('.black').removeClass('less_z_index');
        } else {
            $('.header').children('.wrap').css('position', 'absolute');
            $('.black').addClass('less_z_index');
        }

        if (this.setTimeGA > -1) {
            clearTimeout(this.setTimeGA)
        }

        this.setTimeGA = setTimeout(e => {
            newsEvents.sendGA(windowSTop);
            brandLink.sendGA(windowSTop);
        }, 1500);

    });


})