if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/privacy.pug');
    require('!!raw-loader!../html/EN/privacy.pug');
    require('./master.dev');
}

require('../html/CH/privacy.pug');
require('../html/EN/privacy.pug');
require('../css/privacy.scss');



$(() => {
    require('./common/pageTheme');
    // require('./common/pageSelect');
    require('./common/select');
    require('./common/fixed_service');   
    // require('./common/makers');
})