const EventEmitter = require('events').EventEmitter;

class WindowListen extends EventEmitter {
    constructor() {
        super();

        this.$window = $(window);
        this.windowWidth = this.$window.width();
        this.windowHeight = this.$window.height();
        this.scrollTop = null;
        this.isOpenMenu = false;


        this.$window.resize(() => {
            this.onResize();
        });
        this.$window.scroll(() => {
            this.onScroll();
        });
    }
    onResize() {
        this.windowWidth = this.$window.width();
        this.windowHeight = this.$window.height();
        // console.log(this.windowWidth, this.windowHeight);
        this.emit('resize', this.windowWidth, this.windowHeight);
    }

    onScroll() {
        this.scrollTop = $(window).scrollTop();
        this.emit('scroll', this.scrollTop);
    }
}
module.exports = new WindowListen();