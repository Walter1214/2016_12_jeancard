if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/material.pug');
    require('!!raw-loader!../html/EN/material.pug');
    require('./master.dev');
}

require('../html/CH/material.pug');
require('../html/EN/material.pug');
require('../css/material.scss');

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