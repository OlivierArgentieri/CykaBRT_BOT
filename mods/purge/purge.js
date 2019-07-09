// ---- Discord Core ----
const Discord = require('discord.js');
const Command = require("../command.js");
const request = require('request');

// Config
const config = require('../../config.json');

module.exports = class Help extends Command{
    
    static match(message) {
        let myRoles = message.guild.roles.find(
            "name", "ADMIN").id;
        if(!(message.member.roles.some(r=>["ADMIN", "re_purge"].includes(r.name)))) {
            //amessage.reply("Permiffions insuffisante");
            console.log("denied");
            return false;
        }
        return message.content.startsWith('!purge');
    };
    
    static action(message) {
        const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        console.log(message.textchannel.messages);
       // message.reply("Ton code : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
    };

    static help() {
        return {
          mod: "BK",
          corps: "**Afficher un code BK :**"
          + "\n Exemple : 'un BK maintenant !' Ton code: .... \n \n",
        };
      };
}