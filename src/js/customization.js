if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/customization.pug');
    require('!!raw-loader!../html/EN/customization.pug');
    require('./master.dev');
}

require('../html/CH/customization.pug');
require('../html/EN/customization.pug');
require('../css/customization.scss');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');

const WindowListen = window.WindowListen;
let topArr = [];
let windowHeight = WindowListen.windowHeight;
let lastSendGA = -1;

$(() => {

    require('./common/pageTheme');
    require('./common/pageSelect');
    require('./common/select');
    require('./master/makersHeader');
    require('./customization/switchSwiper');
    require('./common/service');
    require('./common/fixed_service');
    let firstContainerTop = $('.first_container').offset().top - 120;

    WindowListen.on('resize', (w, h) => {
        var firstContainerTop = $('.first_container').offset().top - 120;
        let windowHeight = h;
        setGA();
    })

    $('.more_btn').on('click', () => {
        $("html, body").animate({
            scrollTop: firstContainerTop
        }, 1000, 'easeOutCubic');
        gaEvent('customization', 'customization_more');
    });

    gaInit();
    setGA();
})

function gaInit() {

    let setTimeGA = -1;

    WindowListen.on('scroll', (windowSTop) => {
        // console.log(windowSTop + 150);
        if (setTimeGA > -1) {
            clearTimeout(setTimeGA)
        }

        let windowMid = (windowSTop + (windowHeight / 2));
        setTimeGA = setTimeout(e => {
            sendGA(windowMid);
        }, 1500);

    })
}

function setGA() {
    topArr.length = 0;

    $('.main_content .main_full_screen').each((indexInArray, valueOfElement) => {
        var offset = $(valueOfElement).offset();
        var top = offset.top;
        var height = $(valueOfElement).height();
        topArr.push(top + height);
    });

    $('.main_content .main_container .main_wrap').each((indexInArray, valueOfElement) => {
        var offset = $(valueOfElement).offset();
        var top = offset.top;
        var height = $(valueOfElement).height();
        topArr.push(top + height);
        //  console.log(indexInArray,top);
    });
    // console.log(topArr);
}

function sendGA(windowMid) {
    // console.log(windowMid);
    let indexGA = -1;
    topArr.forEach((element, index) => {
        // console.log(element, index);
        if (indexGA == -1 && windowMid < element) {
            indexGA = index;
            // topArr[indexGA] = -1;
        }
    });
    if (lastSendGA != indexGA) {
        lastSendGA = indexGA;
        switch (indexGA) {
            case 0:
                break;
            case 1:
                gaPageView('/customization/#/card');
                break;
            case 2:
                gaPageView('/customization/#/tape');
                break;
            case 3:
                gaPageView('/customization/#/wooderfullife');
                break;
            default:
                break;
        }
    }

    // console.log(topArr);
}