if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/history.pug');
    require('!!raw-loader!../html/EN/history.pug');
    require('./master.dev');
}

require('../html/CH/history.pug');
require('../html/EN/history.pug');

require('../css/history.scss');


$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./history/switchContent');
    require('./common/service');
    require('./common/fixed_service');    
})