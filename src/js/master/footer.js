class Footer {
    constructor() {
        this.WindowListen = window.WindowListen;

        this.init();
        this.gaInit();
        this.WindowListen.on('resize', (w, h) => {
            this.setFooterHeight();
        })
        this.WindowListen.on('scroll', (_windowSTop) => {
            if ($('.page_theme_out').length) {
                this.toggleLessZindex(_windowSTop);
            }

            if (_windowSTop < 100) {
                $('.black').css('position', 'static');
            } else {
                if (device.desktop()) {
                    $('.black').css('position', 'fixed');
                } else {
                    $('.black').css('position', 'relative');
                }

                this.setFooterHeight();
            }
        })
    }
    init() {
        this.setFooterHeight();
        $('.top_space').click((e) => {
            this.toTOP();
        });
    }
    toTOP() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000, 'easeOutCubic');
    }
    // footer的內容是上稿的需用js給與高度
    setFooterHeight() {
        $('.footer').css('height', $('.black').css('height'));
    }

    toggleLessZindex(windowSTop) {
        var PGheight = $('.page_theme_out').height();
        if (PGheight < windowSTop) {
            $('.black').removeClass('less_z_index');
        } else {
            $('.black').addClass('less_z_index');
        }
    }
    gaInit() {
        $('.footer .black .links a').on('click', (e) => {
            // console.log($(e.target).parent().index());
            switch ($(e.currentTarget).index()) {
                case 1:
                    gaEvent('footer', 'link_to_fb');
                    break;
                case 2:
                    gaEvent('footer', 'link_to_instagram');
                    break;
                case 3:
                    gaEvent('footer', 'link_to_youtube');
                    break;
                case 4:
                    gaEvent('footer', 'link_to_shop');
                    break;
                default:
                    break;
            }

        });
        $('.footer .black .page_link a').on('click', (e) => {
            // console.log($(e.target).attr('href'));
            let brandName =  $(e.currentTarget).attr('href');
            gaEvent('footer', `/brand#${brandName}`);
        })
        $('.footer .black .info_list .read a').on('click', (e) => {
            // console.log($(e.target).attr('href'));
            gaEvent('footer', $(e.currentTarget).attr('href'));
        })
        $('.footer .black .logo_list .logo_bg a').on('click', (e) => {
            // console.log($(e.target).attr('href'));
            let logoName =  $(e.currentTarget).attr('href');
            gaEvent('footer',`link_to_${logoName}`);
        })
    }
}
module.exports = new Footer();