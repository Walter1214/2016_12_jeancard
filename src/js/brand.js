if (process.env.NODE_ENV !== 'production') {
    require('!!raw-loader!../html/CH/brand.pug');
    require('!!raw-loader!../html/EN/brand.pug');
    require('./master.dev');
}

require('../html/CH/brand.pug');
require('../html/EN/brand.pug');

require('../css/brand.scss');
require('../asset/lib/jquery.address.min');
require('../asset/lib/swiper/swiper.min.css');
require('../asset/lib/swiper/swiper.min');

let topArr = [];
const WindowListen = window.WindowListen;
let windowHeight = WindowListen.windowHeight;
let lastSendGA = -1;

$(() => {

    require('./common/pageTheme');
    require('./common/service');
    require('./common/fixed_service');

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect: 'fade',
        // 'speed':1000,
        // 'autoplay':'1000',
        'fade': {
            'crossFade': true
        },
        breakpoints: {}
    });

    //swiper-slide 只有一筆時 pagination next pre 三個按鈕hide
    $('.swiper-container').each((index, elemen) => {
        // console.log(index, elemen);
        if ($(elemen).children('.swiper-wrapper').children('.swiper-slide').length <= 1) {

            $(elemen).children('.swiper-pagination').hide().end().children('.swiper-button-next').hide().end().children('.swiper-button-prev').hide().end();
        }
    });

    WindowListen.on('resize', () => {
        $.each(swiper, function (indexInArray, valueOfElement) {

            valueOfElement.onResize();
        });
    })

    // console.log(location.hash);
    // var hash = location.hash;
    // if (hash) {
    //     e.preventDefault();
    // }

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
        // console.log(windowMid);
        setTimeGA = setTimeout(e => {
            scrollGA(windowMid);
        }, 1500);

    });

    WindowListen.on('resize', (w, h) => {
        let windowHeight = h;
        setGA();
    });

    $('.know_more').on('click', function (e) {
        let brandName = $(e.currentTarget).attr('name');
        gaEvent('brand', `btn_${brandName}_more`);
    });

    $('.shopping').on('click', function (e) {
        let brandName = $(e.currentTarget).attr('name');
        gaEvent('brand', `btn_${brandName}_shop`);
    });
}

function scrollGA(windowMid) {
    for (let i = 0; i < topArr.length; i++) {
        if (windowMid < topArr[i]) {
            // console.log($('.brand .content .style_out').eq(i).attr('name'));
            if (lastSendGA != i) {
                let brandName = $('.brand .content .style_out').eq(i).attr('name')
                gaPageView(`brand/#/${brandName}`);
                lastSendGA = i;
                // topArr[i] = -1;
                break;
            } else {
                break;
            }

        }
    }
}

function setGA() {
    topArr.length = 0;

    $('.brand .content .style_out').each((indexInArray, valueOfElement) => {
        var offset = $(valueOfElement).offset();
        var top = offset.top;
        var height = $(valueOfElement).height();
        topArr.push(top + height);
        //  console.log(indexInArray,top);
    });
    // console.log(topArr);
}