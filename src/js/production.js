if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/production.pug');
    require('!!raw-loader!../html/EN/production.pug');
    require('./master.dev');
}

require('../html/CH/production.pug');
require('../html/EN/production.pug');
require('../css/production.scss');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');
require('../img/CH/desktop/makers/production/gti_1.jpg');
require('../img/CH/desktop/makers/production/gti_2.jpg');
require('../img/CH/desktop/makers/production/gti_3.jpg');
require('../img/CH/desktop/makers/production/sgs_1.jpg');

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