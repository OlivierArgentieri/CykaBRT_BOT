/*
  - Help Mod / Use with !help to show commands use in the bot
*/
const Command = require("./command.js")
module.exports = class Help extends Command{
  static match(message) {
      return message.content.startsWith('!help');
  };
  
  static action (message) {
      let args = message.content.split(' ');
      args.shift();
      message.delete();
      message.reply('\n Liste des commandes disponibles : \n !help : Affiche l\'ensemble des commandes du bot \n');
  };
}