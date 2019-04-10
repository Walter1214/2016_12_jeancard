if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/news.pug');
    require('!!raw-loader!../html/EN/news.pug');
    require('./master.dev');
}

require('../html/CH/news.pug');
require('../html/EN/news.pug');
require('../css/news.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/service');
    require('./common/fixed_service');
})