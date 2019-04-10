class SwitchSwiper {
    constructor() {
        // this.swiper = new Swiper('.swiper-container');
        this.swiper = null;
        this.WindowListen = window.WindowListen;
        this.MachMediaListen = window.MachMediaListen;
        this.windowWidth = $(window).width();
        // console.log(this.windowWidth );

        this.MachMediaListen.on('LessThan1000', (matches) => {

            if (matches) {
                this.switchToMobile();
            } else {
                this.switchToDesktop();
                this.cleanStyle();
            }
        })

        this.MachMediaListen.onMediaQueryLessThan1000();
        // this.WindowListen.on('resize', (w, h) => {
        //     if (w < 1000) {
        //         this.switchToMobile();
        //     } else {
        //         this.switchToDesktop();
        //         this.cleanStyle();
        //     }
        // })
        // if (this.windowWidth < 1000) {

        //     this.switchToMobile();
        // } else {
        //     this.switchToDesktop();
        //     this.cleanStyle();
        // }

        // $('.test').click((e) => {
        //     // swiper.destroy(false,true);
        //     // console.log(swiper);
        //     this.switchToMobile();

        // });
        // $('.test1').click((e) => {
        //     this.switchToDesktop();
        //     //    swiper.attachEvents();
        //     // console.log(swiper);
        // });
    }
    switchToMobile() {
        if (this.swiper == null) {
            $('.swiper-container').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('col_', 'cols_'));
            });
            $('.swiper-wrapper').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('col_', 'cols_'));
            });
            $('.swiper-slide').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('col_', 'cols_'));
            });
            this.swiper = new Swiper('.swiper-container', {
                width: 480,
                spaceBetween: 25,
                slidesPerView: 'auto',
                centeredSlides: true,
                slidesOffsetBefore: (600 - 480) / 2,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
        }
    }
    switchToDesktop() {
        if (!this.swiper == false) {
            $.each(this.swiper, function (indexInArray, valueOfElement) {
                valueOfElement.destroy(false, true);
            });
            $('.swiper-container').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('cols_', 'col_'));
            });
            $('.swiper-wrapper').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('cols_', 'col_'));
            });
            $('.swiper-slide').each(function (index, element) {
                $(element).attr('class', $(element).attr('class').replace('cols_', 'col_'));
            });
            this.swiper = null;
        }

    }
    cleanStyle() {
        $('.swiper-wrapper').each((index, element) => {
            $(element).attr('style', '');
        });
        $('.swiper-slide').each((index, element) => {
            // element == this
            $(element).attr('style', '');
        });
    }
}
module.exports = new SwitchSwiper();