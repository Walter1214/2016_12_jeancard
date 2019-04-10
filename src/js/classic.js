if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/classic.pug');
    require('!!raw-loader!../html/EN/classic.pug');
    require('./master.dev');
}

require('../html/CH/classic.pug');
require('../html/EN/classic.pug');
require('../css/classic.scss');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');


$(() => {
    const WindowListen = window.WindowListen;
    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./classic/switchSwiper');
    require('./common/service');
    require('./common/fixed_service');
    gaInit();
})

function gaInit() {
    let topArr = [];
    let setTimeGA = -1;
    $('.main_content > .main_full_screen').each((indexInArray, valueOfElement) => {
        var offset = $(valueOfElement).offset();
        var top = offset.top;
        var height = $(valueOfElement).height();
        topArr.push(top + height);
        //  console.log(indexInArray,top);
    });
    console.log(topArr);


    WindowListen.on('scroll', (windowSTop) => {
        // console.log(windowSTop + 150);
        if (setTimeGA > -1) {
            clearTimeout(setTimeGA)
        }

        setTimeGA = setTimeout(e => {
            sendGA(windowSTop + 200, topArr);
        }, 1500);

    })
}

function sendGA(windowSTop, topArr) {
    // console.log(windowSTop);
    let indexGA = -1;
    topArr.forEach((element, index) => {
        // console.log(element, index);
        if (indexGA == -1 && windowSTop < element) {
            indexGA = index;
            // topArr[indexGA] = -1;
        }
    });
    switch (indexGA) {
        case 0:
            gaEvent('classic','classic/#/cards');
            break;
        case 1:
            gaEvent('classic','classic/#/stickers');
            break;    
        case 2:
            gaEvent('classic','classic/#/music');
            break;
        case 3:
            gaEvent('classic','classic/#/tape');
            break;
        case 4:
            gaEvent('classic','classic/#/paper');
            break;
        case 5:
            gaEvent('classic','classic/#/music player');
            break;                                                
        default:
            break;
    }
    // console.log(topArr);
}