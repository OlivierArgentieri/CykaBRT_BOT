
/*
*
* - Weather Mod 
* / Use with !weather {city} {unit} {current|week} to show commands use in the bot
*
*/

// Config
const config = require('../config.json');

// ---- Discord Core ----
const Discord = require('discord.js');
const Command = require("./command.js");
const request = require('request');

module.exports = class Help extends Command{
  static match(message) {
      return message.content.startsWith('!weather');
  };
  
  static action(message) {
    let args = message.content.split(' ');
    let apiKey = config.openweather_credentials.api_key;
    if(args[1]) {
      if(args[2] == "metric" || args[2] == "imperial" || !args[2]) {
        const units = args[2] ? `&units=${args[2]}`: "";
        const city = "?q="+ args[1];
        let url = `http://api.openweathermap.org/data/2.5/weather${city}${units}&appid=${apiKey}&lang=fr`
        request(url, function (err, response, body) {
          if(err){
            message.reply(':warning: Request Failed');
          } else {
            let wResponse = JSON.parse(body);
            console.log(wResponse);
            if(wResponse.name) {
              const embed = new Discord.RichEmbed();
              const separator = "--------------------------------------";
      
              var c = wResponse.sys.country;
              var country = c.toLowerCase();

              const iconList = {
                "01": ":sunny:",
                "02": ":white_sun_small_cloud:",
                "03": ":white_sun_cloud:",
                "04": ":cloud:",
                "09": ":white_sun_rain_cloud:",
                "10": ":cloud_rain:",
                "11": ":thunder_cloud_rain:",
                "13": ":cloud_snow:",
                "50": ":wind_blowing_face:"
              }
              const icon = wResponse.weather[0].icon.substring(0,2);
              console.log(icon);

              // Create message
              embed.setAuthor("🌍 Prévision météo en direct")
              .setColor(3447003)
              .setFooter(`(${message.content})`)
              .setDescription(`:flag_${country}: ${wResponse.name}`);
    
              // Fill message
              let baseField = "\n \n" + `${iconList[icon]} ${wResponse.weather[0].description}`
              +"\n \n __Température__ :"
              + "\n Actuelle : **" + wResponse.main.temp + "**"
              + "\n Minimum : **" + wResponse.main.temp_min + "**"
              + "\n Maximum : **" + wResponse.main.temp_min + "** \n \n";
              embed.addField(separator, baseField);
    
              // Send Message
              message.channel.send({embed});
            } else {
              message.reply(':warning: Ville nom connue');
            }
          }
        });
      } else {
        message.reply(':warning: Paramètre d\'unité faux \n - Usage : !weather {city} {option : **units(default: kelvin, value: metric, imperial)**, **format(default: current, value: current, week)**}'
        +'\n - Exemple: !weather Paris metric)');
      }
    } else {
      message.reply(':warning: Veuillez entrer une ville \n - Usage : !weather {city} {option : **units(default: kelvin, value: metric, imperial)**, **format(default: current, value: current, week)**}'
        +'\n - Exemple: !weather Paris metric)');
    }
  };

  static help() {
    return {
      mod: "weather",
      corps: "\n **Afficher la météo d'une ville :**" 
      + "\n ***!weather*** *{city} {option : units(default: kelvin, value: metric, imperial), format(default: current, value: current, week)}*"
      + "\n Exemple : !weather Paris metric \n \n",
    };
  };
}