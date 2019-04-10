class BrandLink {
    constructor() {
        this.offset = $('.brand').offset();
        this.top = this.offset.top;
        this.bottom = $('.brand').height() + this.top;
        this.isSendGA = false;
        this.gaInit();
        this.WindowListen = window.WindowListen;
        this.WindowListen.on('resize', (w, h) => {
            this.setGA();
        })
    }
    gaInit() {
        $('.brand .container .style_1,.brand .container .style_2').on('click', (e) => {
            // console.log($(e.currentTarget).attr('name'));
            let styleName = $(e.currentTarget).attr('name');
            gaEvent('index', `index/#/${styleName}`);
            // return false;
        });
    }

    sendGA(windowSTop) {
        if (!this.isSendGA && windowSTop > this.top && windowSTop < this.bottom) {
            gaPageView('index/#/brand');
            this.isSendGA = true;
        }
    }
    
    setGA() {
        this.top = this.offset.top;
        this.bottom = $('.brand').height() + this.top;
        this.isSendGA = false;
    }
}

module.exports = new BrandLink();