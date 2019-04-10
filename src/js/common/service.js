class Service {
    constructor() {
        this.gaInit();
    }
    gaInit(){
        $('.service a').on('click',  (e) => {
            // console.log($(e.currentTarget).index());
            let pathName = window.location.pathname;
            switch ($(e.currentTarget).index()) {
                case 0:
                    gaEvent('service','btn_business', pathName);
                    break;
                case 1:
                    gaEvent('service','btn_contact', pathName);
                    break;
                default:
                    break;
            }
        });
    }
}
module.exports = new Service();