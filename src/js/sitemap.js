if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/sitemap.pug');
    require('!!raw-loader!../html/EN/sitemap.pug');
    require('./master.dev');
}

require('../html/CH/sitemap.pug');
require('../html/EN/sitemap.pug');
require('../css/sitemap.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/select');
    require('./common/fixed_service');   
})