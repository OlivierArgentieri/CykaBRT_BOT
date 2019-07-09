// Config
const config = require('./config.json');

// ---- Discord Core ----
const Discord = require('discord.js'),
      bot = new Discord.Client();

// ---- Mods ----
let modsConfig = [];
let UserTweet, HashTagTweet, Weather, BK, purge;
const Help = require('./mods/help.js');

BK = require("./mods/BK/BK.js");
modsConfig.push(BK.help());

purge = require("./mods/purge/purge.js");
modsConfig.push(purge.help());

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

if(config.openweather_credentials.api_key != null) {
    console.log("Loading Weather_Mod");
    Weather = require('./mods/weather.js');
    modsConfig.push(Weather.help());
    console.log("Done !");
} else {
    Weather = "error";
    console.log("Require config for Weather_Mod");
}


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    // Print GamePlayed Management
    bot.user.setActivity(config.bot.playedGame).catch(console.error);
});

bot.on('message', message => {
    // Use commands
    let commandUsed = Help.parse(message, modsConfig);
    commandUsed += UserTweet != "error" ? UserTweet.parse(message) : null;
    commandUsed += HashTagTweet != "error" ? HashTagTweet.parse(message) : null;
    commandUsed += Weather != "error" ? Weather.parse(message) : null;
    commandUsed += BK.parse(message);
    commandUsed += purge.parse(message);
});

bot.login(config.bot.token);

console.log('Bot has been Started !')
