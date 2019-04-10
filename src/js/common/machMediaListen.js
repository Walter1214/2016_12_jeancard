const EventEmitter = require('events').EventEmitter;

class MachMediaListen extends EventEmitter {
    constructor() {
        super();
        this.mediaQueryLessThan1000 = window.matchMedia("screen and (max-width: 1000px)");
        this.LessThan1000Maches = null;
        this.mediaQueryLessThan1000.addListener((MediaQueryListEvent) => {
            // console.log(MediaQueryListEvent);
            this.onMediaQueryLessThan1000(MediaQueryListEvent.matches);
        })

        this.setMediaQueryLessThan1000();
    }

    onMediaQueryLessThan1000(matches = null) {
        // console.log(matches);
        this.LessThan1000Maches = matches === null ? this.mediaQueryLessThan1000.matches : matches;
        this.emit('LessThan1000', this.LessThan1000Maches);
    }

    setMediaQueryLessThan1000(matches = null){
        this.LessThan1000Maches = matches === null ? this.mediaQueryLessThan1000.matches : matches;
    }
}
module.exports = new MachMediaListen();