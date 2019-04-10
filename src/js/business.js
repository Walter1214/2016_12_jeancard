if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/business.pug');
    require('!!raw-loader!../html/EN/business.pug');
    require('./master.dev');
}

require('../html/CH/business.pug');
require('../html/EN/business.pug');
require('../css/business.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/service');
    require('./common/fixed_service');    
})