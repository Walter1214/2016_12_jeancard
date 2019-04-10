if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/searchlist.pug');
    require('!!raw-loader!../html/EN/searchlist.pug');
    require('./master.dev');
}

require('../html/CH/searchlist.pug');
require('../html/EN/searchlist.pug');

require('../css/catalog.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/fixed_service');
})