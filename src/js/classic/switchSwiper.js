class SwitchSwiper {
    constructor() {
        // this.swiper = new Swiper('.swiper-container');
        this.swiper = null;
        this.WindowListen = window.WindowListen;
        this.MachMediaListen = window.MachMediaListen;
        // this.windowWidth = $(window).width();

        this.MachMediaListen.on('LessThan1000', (matches) => {
            // console.log(mediaQueryListMatches);

            if (matches && this.swiper == null) {
                this.switchToMobile();
            } else if (!matches && !this.swiper == false) {
                this.switchToDesktop();
                this.cleanStyle();
            }
        })

        this.MachMediaListen.onMediaQueryLessThan1000();
        // this.WindowListen.on('resize', (w, h) => {
        //     if (w < 1000 && this.swiper == null) {
        //         this.switchToMobile();
        //     } else if (w >= 1000 && !this.swiper == false) {
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


    }
    switchToMobile() {
        this.swiper = new Swiper('.swiper-container', {
            width: 480,
            spaceBetween: 25,
            slidesPerView: 'auto',
            centeredSlides: true,
            slidesOffsetBefore: (640 - 480) / 2,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
    }
    switchToDesktop() {

        $.each(this.swiper, function (indexInArray, valueOfElement) {

            valueOfElement.destroy(false, true);
        });
        this.swiper = null;
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