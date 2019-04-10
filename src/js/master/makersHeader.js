class MakersHeader {

    constructor() {
        this.WindowListen = window.WindowListen
        var offset = $('.page_select_out').offset();
        var pageSelectTop = offset.top;

        this.WindowListen.on('scroll', (windowTop) => {
            // console.log(windowTop,pageSelectTop);
            if (windowTop > pageSelectTop) {
                $('.makers_header').addClass('ON');
            }else{
                $('.makers_header').removeClass('ON');
            }
        })

        
    }
}

module.exports = new MakersHeader();