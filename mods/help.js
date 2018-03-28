/*
*
* - Help Mod 
* / Use with !help to show commands use in the bot
*
*/

// ---- Discord Core ----
const Discord = require('discord.js');
const Command = require("./command.js");

module.exports = class Help extends Command{
  static parse(message, modsConfig){
    if(this.match(message)) {
        this.action(message, modsConfig);
        return true;
    }
    return false;     
  };

  static match(message) {
      return message.content.startsWith('!help');
  };
  
  static action(message, modsConfig) {
      const embed = new Discord.RichEmbed();
      const separator = "--------------------------------------"
      
      // Create message
      embed.setAuthor("☕ Comment puis-je vous aider ?")
      .setColor(3447003)
      .setFooter("N'hésitez pas à me recontacter (!help)");

      // Fill message
      let modsField = "";
      let baseField = this.help().corps;
      for(let i = 0; i < modsConfig.length; i++){
        if(modsConfig[i].mod === "base"){
          baseField += modsConfig[i].corps;
        } else {
          modsField += modsConfig[i].corps;
        }
      }
      embed.addField("__Commandes Basiques :__", baseField);
      embed.addField("__Commandes des Mods :__", modsField);
      // Send Message
      message.channel.send({embed});
  };

  static help() {
    return {
      mod: "base",
      corps: " **Afficher l'ensemble des commandes du bot : ** \n ***!help***\n \n",
    };
  }
}