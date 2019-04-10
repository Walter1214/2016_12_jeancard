class PageSelect {

    constructor() {
        this.optionIsOpen = false;

        // $('.page_select a').on('touchend',(e) => {

        //     // console.log(e.target);
        //     // alert(e.target);
        //     // e.preventDefault();
        // });

        $('.switch').on('click', () => {
            if (this.optionIsOpen) {
                $('.news_select').removeClass('OPEN');
                this.optionIsOpen = false;
            } else {
                $('.news_select').addClass('OPEN');
                this.optionIsOpen = true;
            }

        });

        $('.option').on('click', (e) => {

            $('.default_option').attr({
                'data-value': $(e.target).attr('data-value'),
                'data-name': $(e.target).attr('data-name')
            }).html($(e.target).attr('data-name'));
            $('.news_select').removeClass('OPEN');
            this.optionIsOpen = false;

        });
    }
}

module.exports = new PageSelect();