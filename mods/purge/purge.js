// ---- Discord Core ----
const Discord = require('discord.js');
const Command = require("../command.js");
const request = require('request');

// Config
const config = require('../../config.json');

module.exports = class Help extends Command {

    static match(message) {
        if (message.content.startsWith('!purge')) {
            if (!(message.member.roles.some(r => ["ADMIN", "re_admin"].includes(r.name)))) {
                message.reply("Permiffions insuffisante");
                return false;
            }
            return true;
        }
    };

    static action(message) {
        const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        
        if (args[0] != null)
        
        var numberOfMessage = Number(args[0]);
        if(numberOfMessage != NaN && Math.floor(numberOfMessage) < 10000)
            purge(message, Math.floor(numberOfMessage)).then(message.reply(`suppression de ${Math.floor(numberOfMessage)} messages`));
        else {
            message.reply("Valeur incorrect utiliser le !help")
        }
        // message.reply("Ton code : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
    };

    static help() {
        return {
            mod: "Purge [ ADMIN || re_admin only ]",
            corps: "**Purge un nombre de message :**"
                + "\n Exemple : '!purge <number_of_message>' suppression de <number_of_message> messages \n \n"
                + "\n Valeur de message maximum : 9999",
        };
    };


};
async function purge(message, numberOfMessage) {
    let fetched;

    var quotient = Math.floor(numberOfMessage / 100);
    var remainder = numberOfMessage % 99;

    for (var i = 0; i < quotient; i++) {
        fetched = await message.channel.fetchMessages({ limit: 100 });
        message.channel.bulkDelete(fetched);
    }

    fetched = await message.channel.fetchMessages({ limit: remainder });
    message.channel.bulkDelete(fetched);
}