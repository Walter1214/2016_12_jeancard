if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/marketing.pug');
    require('!!raw-loader!../html/EN/marketing.pug');
    require('./master.dev');
}

require('../html/CH/marketing.pug');
require('../html/EN/marketing.pug');
require('../css/marketing.scss');

require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');

$(window).on('load', e => {
    require('./common/makers');
});
$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/service');
    require('./common/fixed_service');        
})