// Discord Core
const Discord = require('discord.js'),
      bot = new Discord.Client();
// Libs
const biguint = require('biguint-format'),
      crypto = require('crypto');
// Mods
const Help = require('./mods/help.js');

// Random Function
function random (qty) {
    return crypto.randomBytes(qty);
}

// BK Month
var IndiceBK = ["BB", "LS", "JH", "PL", "BK", "WH", "FF", "BF", "CF", "CK", "CB", "VM"];

var general;

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // Print GamePlayed Management
    bot.user.setGame('Je suis un main Hanzo').catch(console.error);
    // Channel Management
    bot.channels.get("420526968157765633")
    general = bot.channels.get("215765926392496128")
});

bot.on('message', message => {
    messageToUpper = message.content.toUpperCase().replace(" ", "");
    if (messageToUpper.includes("BK") || messageToUpper.includes("BURGERKING")) {
        var date = new Date() 
        currentMonth = date.getMonth()
        //general.send("Ton code KONAR : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5))
        message.reply("Ton code KONAR : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
    }

    // Use command
    let commandUsed = Help.parse(message);
});



bot.login(config.bot.token);

console.log('Bot has been Started !')
