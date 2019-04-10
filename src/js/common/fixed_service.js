class FixedService {
    constructor() {
        this.gaInit();
        if ($('body').hasClass('EN')) {
            $('.fixe_service .business').attr('title', 'Contact Us').html('');
            $('.fixe_service .customized').attr('title', 'Cooperation').html('');
        }

    }
    gaInit(){
        $('.fixe_service a').on('click',  (e) => {
            console.log($(e.currentTarget).index());
            let pathName = window.location.pathname;
            // 沒有1因為前端頁面顯示是一條線
            switch ($(e.currentTarget).index()) {
                case 0:
                    gaEvent('service','btn_business', pathName);
                    break;
                case 2:
                    gaEvent('service','btn_contact', pathName);
                    break;
                default:
                    break;
            }
        });
    }
}
module.exports = new FixedService();