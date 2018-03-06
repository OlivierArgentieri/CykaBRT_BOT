const Discord = require('discord.js'), 
      biguint = require('biguint-format'),
      crypto = require('crypto');
const client = new Discord.Client();



function random (qty) {
    return crypto.randomBytes(qty);
}


// code BK
var IndiceBK = ["BB", "LS", "JH", "PL", "BK", "WH", "FF", "BF", "CF", "CK", "CB", "VM"];

var general;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.channels.get("420526968157765633")
 general = client.channels.get("215765926392496128")

});

client.on('message', msg => {
    msgToUpper = msg.content.toUpperCase().replace(" ", "");
  if (msgToUpper.includes("BK") || msgToUpper.includes("BURGERKING")) {
      var date = new Date() 
      m = date.getMonth()
      //general.send("Ton code KONAR : " + IndiceBK[m] + biguint(random(15), 'dec').substr(1, 5))
      msg.reply("Ton code KONAR : " + IndiceBK[m] + biguint(random(15), 'dec').substr(1, 5) + " :hamburger:")
  }
 
});



client.login("token");

console.log('start')
