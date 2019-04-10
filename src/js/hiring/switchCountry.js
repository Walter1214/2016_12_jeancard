class SwitchCountry {
    constructor() {
        this.hiringIndex = 0;
        var windowListen = window.WindowListen;
        this.MachMediaListen = window.MachMediaListen;
        //判斷螢幕寬1000 下拉選單預設關閉
        this.optionIsOpen = false;
        this.init();
        $('.title_click').on('click', (e) => {
            //取得目前按的是哪一個按鈕
            var index = $(e.currentTarget).parent().index();
            this.MachMediaListen.setMediaQueryLessThan1000();
            let matches = this.MachMediaListen.LessThan1000Maches;
            //判斷式只有桌機才有此功能。
            if (!matches) {

                //打開選擇的內容。
                this.openContent(index);
                this.sendGAEvent(index);
                //移到選擇的頂端
                var offset = $('.hiring_container').eq(index).offset();
                var top = offset.top;
                $(window).scrollTop(top - 180);
            }
        });

        $('.switch_click').on('click', () => {
            if (this.optionIsOpen) {
                $('.hiring_select').removeClass('OPEN');
                this.optionIsOpen = false;
            } else {
                $('.hiring_select').addClass('OPEN');
                this.optionIsOpen = true;
            }

        });

        $('.option_click').on('click', (e) => {
            let $indexNumber = $(e.target).index();
            this.changeOption($indexNumber);
            this.openContentForPhone($indexNumber);
            this.sendGAEvent($indexNumber);
        });
        // windowListen.on('resize', (windowWidth, windowHeight) => {
        //     if (windowWidth < 1000) {
        //         this.changeOption(0);
        //         this.openContentForPhone(0);
        //     } else {
        //         $('.hiring_container').removeClass('OPEN');
        //     }
        // })
    }
    init() {
        if ($(window).width() < 1010) {
            this.changeOption(0);
            this.openContentForPhone(0);
        } else {
            $('.hiring_container').removeClass('OPEN');
        }
    }

    openContent(classIndex) {
        let $Index = $('.hiring_container').eq(classIndex);
        if ($Index.hasClass('OPEN')) {
            $Index.removeClass('OPEN');
        } else {
            $Index.addClass('OPEN').siblings().removeClass('OPEN');
            this.sendGAEvent(classIndex);
        }
    }

    openContentForPhone(classIndex) {
        let $Index = $('.hiring_container').eq(classIndex);
        if ($Index.hasClass('OPEN')) {
            // $Index.removeClass('OPEN');
        } else {
            $Index.addClass('OPEN').siblings().removeClass('OPEN');
        }
    }

    changeOption(optionIndex) {
        $('.default_option').attr({
            'data-value': $('.option_click').eq(optionIndex).attr('data-value'),
            'data-name': $('.option_click').eq(optionIndex).attr('data-name')
        }).html($('.option_click').eq(optionIndex).attr('data-name'));
        $('.hiring_select').removeClass('OPEN');
        this.optionIsOpen = false;
    }

    sendGAEvent(classIndex) {
        //send GAEvent
        switch (classIndex) {
            case 0:
                gaEvent('history', 'btn_hiring_taiwan');
                break;
            case 1:
                gaEvent('history', 'btn_hiring_Shenzhen')
                break;
            case 2:
                gaEvent('history', 'btn_hiring_Xiamen')
                break;
            default:
                break;
        }
    }    
}

module.exports = new SwitchCountry();