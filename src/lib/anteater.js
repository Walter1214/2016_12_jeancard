class Anteater {
    constructor() {
        this.MOBILE_PATTERN = /^\d{10}$/;
        this.PHONE_PATTERN = /^[0-9]{6,10}$/;
        this.IDENTITY_CARDS_PATTERN = /[A-Za-z]{1}[0-9]{9}/;
        this.LETTER_ARRAY = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z", "i", "o"];
        this.NUMBER_ARRAY = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
        this.EMAIL_PATTERN = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        this.ENGLISH = /^[A-Za-z]*$/;
        this.NUMBER = /^\d+$/;
    }

    isEmail(sEmail) {
        return this.EMAIL_PATTERN.test(sEmail);
    }

    isPhone(sPhone) {
        return this.PHONE_PATTERN.test(sPhone);
    }

    isEnglish(sEnglish) {
        return this.ENGLISH.test(sEnglish);
    }
    isNumber(sNumber) {
        return this.NUMBER.test(sNumber);
    }
}

module.exports = Anteater;