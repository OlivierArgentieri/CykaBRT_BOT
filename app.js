// Config
const config = require('./config.json');

// ---- Discord Core ----
const Discord = require('discord.js'),
      bot = new Discord.Client();

// ---- Libs ----
const biguint = require('biguint-format');
const crypto = require('crypto');

// ---- Mods ----
let modsConfig = [];
let UserTweet, HashTagTweet;
const Help = require('./mods/help.js');

/* Check Config for Mods */
if(config.twitter_credentials.consumer_key != null) {
    console.log("Loading Twitter_Mod");

    UserTweet = require('./mods/twitter/userTweet.js');
    HashTagTweet = require('./mods/twitter/hashtagTweet.js');
    modsConfig.push(UserTweet.help(), HashTagTweet.help());

    console.log("Done !");
} else {
    UserTweet = "error"; 
    HashTagTweet = "error";
    console.log("Require config for Twitter_Mod");
}

// Random Function
function random (qty) {
    return crypto.randomBytes(qty);
}

// BK Month
const IndiceBK = ["BB", "LS", "JH", "PL", "BK", "WH", "FF", "BF", "CF", "CK", "CB", "VM"];

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // Print GamePlayed Management
    bot.user.setActivity(config.bot.playedGame).catch(console.error);
});

bot.on('message', message => {
    messageToUpper = message.content.toUpperCase().replace(" ", "");
    if (messageToUpper.includes("BK") || messageToUpper.includes("BURGERKING")) {
        var date = new Date() 
        currentMonth = date.getMonth()
        //general.send("Ton code : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5))
        message.reply("Ton code : " + IndiceBK[currentMonth] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
    }

    // Use commands
    let commandUsed = Help.parse(message, modsConfig);
    commandUsed += UserTweet != "error" ? UserTweet.parse(message) : null;
    commandUsed += HashTagTweet != "error" ? HashTagTweet.parse(message) : null;
});

bot.login(config.bot.token);

console.log('Bot has been Started !')
