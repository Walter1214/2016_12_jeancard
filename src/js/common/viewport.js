class ViewPort {
    constructor() {
        this.WindowListen = window.WindowListen;
        const $vp = $('meta[name="viewport"]'),
            vptext = 'width={WSIZE}, user-scalable=no, shrink-to-fit=no',
            onOrientationChanged = e => {
                // if (device.tablet()) {
                //     // alert('onOrientationChanged');
                //     if (device.landscape()) {
                //         $vp.attr('content', vptext.replace('{WSIZE}', '1024'));
                //     } else {
                //         $vp.attr('content', vptext.replace('{WSIZE}', '800'));
                //     }
                // } else {
                //     $vp.attr('content', vptext.replace('{WSIZE}', '640'));
                // };

                // if (device.mobile()) {
                //     $vp.attr('content', vptext.replace('{WSIZE}', '640'));
                // }
                // $(window).trigger('swiper-resize');
                // setTimeout(() => {
                //     this.WindowListen.onResize();

                // }, 300);
            };

        // this.WindowListen.on('orientationChanged', () => {
        //     setTimeout(() => {
        //         onOrientationChanged();
        //         // $("html, body").animate({
        //         //     scrollTop: 0
        //         // }, 0);
        //     }, 300);
        // });

        if (device.mobile()) {
            $vp.attr('content', vptext.replace('{WSIZE}', '640'));
        }

    }

}
module.exports = new ViewPort();