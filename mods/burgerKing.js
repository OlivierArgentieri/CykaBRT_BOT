const biguint = require('biguint-format');
const crypto = require('crypto');
module.exports = class BurgerKing{

    static codeGenerate(message){
        
        // BK Month
        var IndiceBK = ["BB", "LS", "JH", "PL", "BK", "WH", "FF", "BF", "CF", "CK", "CB", "VM"];

       var messageToUpper = this.parse(message)
        if (messageToUpper.includes("BK") || messageToUpper.includes("BURGERKING")) {
            var date = new Date() 
           var currentMonth = date.getMonth()
            message.reply("Ton code : " + IndiceBK[currentMonth] + biguint(this.random(15), 'dec').substr(1, 5) + " :hamburger:")
        }
    };

    static parse(message){
        return message.content.toUpperCase().replace(" ", "");
    };

    // Random Function
    static random (qty) {
        return crypto.randomBytes(qty);
    };
}

