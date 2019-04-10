class Header {
    constructor() {
        this.WindowListen = window.WindowListen
        this.MachMediaListen = window.WindowListen
        // this.initMenuOpen();
        // this.initMenuClose();
        this.init();
        this.gaInit();


        this.MachMediaListen.on('LessThan1000', (matches) => {
            if (matches) {

            } else {

            }
        })
    }

    init() {
        $('.lines').on('click', () => {
            this.menuOpen();
        });

        $('.cross').on('click', () => {
            this.menuClose();
        });
    }

    menuOpen() {
        if (!this.WindowListen.isOpenMenu) {
            $('.header').addClass('menu');
            $('.root').css('position', 'fixed');
            this.WindowListen.isOpenMenu = true;
        }

    }
    menuClose() {
        if (this.WindowListen.isOpenMenu) {
            $('.header').removeClass('menu');
            $('.root').css('position', 'relative');
            this.WindowListen.isOpenMenu = false;
        }
    }
    gaInit() {
        $('.header .wrap ul li a').on('click', (e) => {
            gaEvent('header', $(e.currentTarget).attr('href'));
        });
        $('.header .wrap a').on('click', (e) => {
            gaEvent('header', $(e.currentTarget).attr('href'));
        });
        $('.header .wrap .lines').on('click', (e) => {
            gaEvent('header', 'mobile_menu');
        });
    }
}

module.exports = new Header();