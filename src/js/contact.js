if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/contact.pug');
    require('!!raw-loader!../html/EN/contact.pug');
    require('./master.dev');
}

require('../html/CH/contact.pug');
require('../html/EN/contact.pug');
require('../css/contact.scss');



$(() => {
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./common/service');
    require('./common/fixed_service');    
})