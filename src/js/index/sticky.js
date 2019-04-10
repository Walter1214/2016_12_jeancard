class Sticky {
    constructor() {

        var bodyCalssName = $('body').attr('class');
        this.Quotes = [];
        switch (bodyCalssName) {
            case 'EN':
                this.Quotes = [
                    '<span>Wishing you a day of unexpected joys and a year of simple pleasures to come.</span>',
                    '<span>Where flowers bloom so does hope.-Samuel L. Barrett</span>',
                    '<span>The butterfly counts not months but moments.–Rabindranath TagoreWishing you a one-of-a-kind wonderful day.</span>',
                    '<span>Family is the best gift of all.You bring so much joy and happiness to my life.</span>',
                    '<span>May good luck go with you, and happiness too！</span>',
                    '<span>Have a happy and graceful day.</span>',
                    '<span>Wishing you a bright and carefree day！</span>',
                    '<span>Wishing you all the very best on your special day.</span>',
                    '<span>Sending you a little love on your special day.</span>',
                    '<span>May your life be showered with love and happiness.</span>',
                    '<span>May this day be the start of a wonderful life together.</span>',
                    '<span>Tie one on and have a great day！</span>'
                ];
                break;
            default:
                this.Quotes = [
                    '<span>祝你每一天都有意想不到的喜悅</span><span>每一年都有純真的快樂，都即將實現</span>',
                    '<span>凡是花開的地方</span><span>就有希望</span>',
                    '<span>蝴蝶計數不是幾個月，而是片刻</span><span>願你有美好的一天</span>',
                    '<span>世界上最棒的禮物就是家人</span><span>你為我的生活帶來了許多美好的事物</span>',
                    '<span>美好事物伴隨著你！</span>',
                    '<span>願你擁有快樂、愉快的一天</span>',
                    '<span>祝你有個開心和無憂無慮的一天！</span>',
                    '<span>在你特別的日子裡給你最好的祝福</span>',
                    '<span>在你特別的日子裡送上小小的愛</span>',
                    '<span>願你們的生活充滿著愛和幸福</span>',
                    '<span>願今天是你們所有幸福快樂的開始</span>',
                    '<span>戴上領帶並有很棒的一天</span>'
                ];
                break;
        }


        this.setTimeSticky = -1;
        this.maxNum = 11;
        this.minNum = 0;
        this.randomNumber = Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;

        this.rewriteSticky()

        $('.text_space').mouseleave(() => {
            if (this.setTimeSticky > -1) {
                clearTimeout(this.setTimeSticky)
            }

            this.setTimeSticky = setTimeout(e => {
                this.rewriteSticky()
                gaEvent('index', 'phrase');
            }, 700);

        });
    }

    rewriteSticky() {
        if (this.randomNumber++ > 10) {
            this.randomNumber = this.minNum;
        }

        $('.sticky_container>.text_space').empty().append(this.Quotes[this.randomNumber]);
    }
}

module.exports = new Sticky();