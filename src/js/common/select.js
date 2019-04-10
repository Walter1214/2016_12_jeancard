class Select {

    constructor() {
        this.optionIsOpen = false;

        $('.select_switch').on('click', (event) => {
            if (this.optionIsOpen) {
                // $('.select').removeClass('OPEN');

                $(event.target).parent('.select').removeClass('OPEN');
                this.optionIsOpen = false;
            } else {
                $(event.target).parent('.select').addClass('OPEN');
                // $('.select').addClass('OPEN');
                this.optionIsOpen = true;
            }

        });

        $('.select_option').on('click', (event) => {
        
            $(event.target).parent('.option_out').parent('.select').children('.default_option').attr({
                'data-value': $(event.target).attr('data-value'),
                'data-name': $(event.target).attr('data-name')
            }).html($(event.target).attr('data-name')).addClass('USED');
            $(event.target).parent('.option_out').parent('.select').removeClass('OPEN');
            this.optionIsOpen = false;

        });
    }
}

module.exports = new Select();