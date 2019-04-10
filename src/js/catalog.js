if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/catalog.pug');
    require('!!raw-loader!../html/EN/catalog.pug');
    require('./master.dev');
}

require('../html/CH/catalog.pug');
require('../html/EN/catalog.pug');

require('../css/catalog.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/fixed_service');
})