// ---- Discord Core ----
const Discord = require('discord.js');
const Command = require("../command.js");
const request = require('request');

// ---- Libs ---
const biguint = require('biguint-format');
const crypto = require('crypto');

// BK Month
const IndiceBK = ["BB", "LS", "JH", "PL", "BK", "WH", "FF", "BF", "CF", "CK", "CB", "VM"];
// Random Function
function random(qty) {
    return crypto.randomBytes(qty);
}
module.exports = class Help extends Command {

    static match(message) {
        let messageToUpper = message.content.toUpperCase().replace(" ", "");
        return !messageToUpper.includes("HTTP://") && !messageToUpper.includes("HTTPS://") && messageToUpper.includes("BK") || messageToUpper.includes("BURGERKING") ;
    };

    static action(message) {
        var date = new Date()
        var currentMonth = date.getMonth();
        message.reply("Ton code : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
    };

    static help() {
        return {
            mod: "BK",
            corps: "**Afficher un code BK :**"
                + "\n Exemple : 'un BK maintenant !' Ton code: .... \n \n",
        };
    };
}