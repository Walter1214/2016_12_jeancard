if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/design.pug');
    require('!!raw-loader!../html/EN/design.pug');
    require('./master.dev');
}

require('../html/CH/design.pug');
require('../html/EN/design.pug');
require('../css/design.scss');

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