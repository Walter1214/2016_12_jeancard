require('../asset/lib/jquery.min');
require('../asset/lib/es6-promise.auto.min');
require('../asset/lib/jquery.easing.min.js');
require('../lib/milkmidi.device');
require('../css/master.scss');
require('../img/CH/favicon-jean.ico');
require('../img/CH/fb_share_1200x627.jpg');
window.WindowListen = require('common/windowListen');
window.MachMediaListen = require('common/machMediaListen');
require('./common/viewport');
$(() => {

    $('body').attr('oncontextmenu', 'window.event.returnValue=false');

})

$(window).on('load', () => {
    require('./master/header');
    require('./master/footer');
});