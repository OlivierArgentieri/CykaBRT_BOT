// Discord Core
const Discord = require('discord.js'),
      bot = new Discord.Client();
// Libs

// Mods
const Help = require('./mods/help.js');
const BK = require('./mods/burgerKing.js')

// Config
const config = require('./config.json');



var general;

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // Print GamePlayed Management
    bot.user.setActivity(config.bot.playedGame).catch(console.error);
    // Channel Management
    bot.channels.get(config.channel.cyka);
    general = bot.channels.get(config.channel.general);

});

bot.on('message', message => {
        BK.codeGenerate(message);
        // Use command
    let commandUsed = Help.parse(message);
    }    
);

bot.login(config.bot.token);

console.log('Bot has been Started !')
