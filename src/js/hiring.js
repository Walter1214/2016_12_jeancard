if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/hiring.pug');
    require('!!raw-loader!../html/EN/hiring.pug');
    require('./master.dev');
}

require('../html/CH/hiring.pug');
require('../html/EN/hiring.pug');
require('../css/hiring.scss');

$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./hiring/switchCountry');
    require('./common/service');
    require('./common/fixed_service');        
})
