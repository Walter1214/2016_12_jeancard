class Value {
    constructor() {
        // this.index = 0;
        // this.isWork = false;
        // this.desktop_value = $('.desktop_value ');
        // this.goValue();
        // console.log(windowScrollTop);


        this.$desktopValueOut = $('.desktopo_value_out');
        this.$desktopValue = $('.desktop_value');
        this.gaInit();
        this.desktopValueInit();

        this.WindowListen = window.WindowListen;

        this.WindowListen.on('resize', (w, h) => {
            // console.log(w, h);
            this.desktopValueInit();
        })
        
        this.WindowListen.on('scroll', (windowScrollTop) => {
            let windowScrollBottom = windowScrollTop + this.$desktopValue.height();

            if (windowScrollTop < this.desktopValueOutTop) {
                this.$desktopValue.css({
                    position: 'absolute',
                    top: 0,
                    bottom: 'auto'
                });
            } else if (windowScrollBottom > this.desktopValueOutBottom) {
                this.$desktopValue.css({
                    position: 'absolute',
                    top: 'auto',
                    bottom: 0
                });
            } else {
                this.$desktopValue.css({
                    position: 'fixed',
                    top: 0,
                    bottom: 0
                });
                let i = windowScrollTop - this.desktopValueOutTop;
                let j = Math.floor(i / this.desktopValueAverageHeight) + 1;
                // console.log(j);
                // console.log('ypos:', windowScrollTop);
                this.$desktopValue.attr('class', 'desktop_value style_' + j);
            }
        })

        this.WindowListen.onScroll();
    }

    desktopValueInit() {
        this.desktopValueOutTop = this.$desktopValueOut.offset().top;
        this.desktopValueOutHeight = this.$desktopValueOut.height(this.$desktopValue.height() * 5).height();
        this.desktopValueOutBottom = this.desktopValueOutTop + this.desktopValueOutHeight;
        this.desktopValueAverageHeight = this.desktopValueOutHeight * 0.2 | 0;
        // console.log('top:', this.desktopValueOutTop, 'height:', this.desktopValueOutHeight, 'Bottom:', this.desktopValueOutBottom, 'averageHeight:', this.desktopValueAverageHeight);
    }

    gaInit() {
        $('.desktop_value .more_btn').on('click', (e) => {
            let hrefName = $(e.currentTarget).attr('href');
            // console.log(hrefName.indexOf('design'));
            if (hrefName.indexOf('design') > 0) {
                gaEvent('footer', 'value_design_more');
            } else if (hrefName.indexOf('material') > 0) {
                gaEvent('footer', 'value_material_more');
            } else if (hrefName.indexOf('production') > 0) {
                gaEvent('footer', 'value_production_more');
            } else if (hrefName.indexOf('marketing') > 0) {
                gaEvent('footer', 'value_marketing_more');
            }
        });
        $('.mobile_value .more_btn').on('click', (e) => {
            let hrefName = $(e.currentTarget).attr('href');
            // console.log(hrefName.indexOf('design'));
            if (hrefName.indexOf('design') > 0) {
                gaEvent('footer', 'value_design_more');
            } else if (hrefName.indexOf('material') > 0) {
                gaEvent('footer', 'value_material_more');
            } else if (hrefName.indexOf('production') > 0) {
                gaEvent('footer', 'value_production_more');
            } else if (hrefName.indexOf('marketing') > 0) {
                gaEvent('footer', 'value_marketing_more');
            }
        });
    }

    // goValue() {
    //     this.desktop_value.on('mousewheel', (event) => {
    //         // console.log(this.isWork,this.index,event.deltaY);

    //         if (!this.isWork) {
    //             if (event.deltaY < 0) {
    //                 if (this.desktop_value.offset().top > $(window).scrollTop()) {
    //                     event.preventDefault();

    //                     this.goDesktop_Value(1);
    //                 } else if (this.index < 4) {
    //                     event.preventDefault();
    //                     this.changeClass(this.index + 1, true);
    //                 }
    //             } else if (event.deltaY > 0) {
    //                 if (this.desktop_value.offset().top < $(window).scrollTop()) {
    //                     this.goDesktop_Value(4);
    //                 } else if (this.index > 1) {
    //                     event.preventDefault();
    //                     this.changeClass(this.index - 1, true);
    //                 }
    //             }
    //         } else {
    //             event.preventDefault();
    //         }
    //     })
    // }
    // changeClass(addId, stopWork = false) {
    //     console.log('changeclass', this.index, addId);
    //     if (stopWork) this.isWork = true;
    //     this.desktop_value.attr('class', 'desktop_value style_' + addId);
    //     this.index = addId;
    //     if (stopWork) setTimeout(() => {

    //         this.isWork = false;
    //     }, 1500);
    // }
    // goDesktop_Value(target) {

    //     this.isWork = true;
    //     this.changeClass(target);
    //     $("html, body").animate({
    //         scrollTop: this.desktop_value.offset().top
    //     }, 1500, 'easeOutCubic', () => {
    //         this.isWork = false;
    //     });
    // }
}
module.exports = new Value();