if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/buyers.pug');
    require('!!raw-loader!../html/EN/buyers.pug');
    require('./master.dev');
}

require('../html/CH/buyers.pug');
require('../html/EN/buyers.pug');
require('../css/buyers.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/service');
    require('./common/fixed_service');        
})