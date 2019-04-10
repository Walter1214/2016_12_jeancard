if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/shoplist.pug');
    require('!!raw-loader!../html/EN/shoplist.pug');
    require('./master.dev');
}

require('../html/CH/shoplist.pug');
require('../html/EN/shoplist.pug');
require('../css/shoplist.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./master/makersHeader');
    require('./common/service');
    require('./common/fixed_service');    
})