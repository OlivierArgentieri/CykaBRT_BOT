/*
*
* -  Mod hashtagTweet 
* / Use with !hashtagtweet {name} to get tweet from a #hashtag
*
*/
// Config
const config = require('../../config.json');

// Twitter
const Twitter = require('twitter');
const twitterApi = new Twitter(config.twitter_credentials);

// Command Base
const Command = require("../command.js");

module.exports = class HashTagTweet extends Command{
  static match(message) {
      return message.content.startsWith('!hashtagtweet');
  };
  
  static action(message) {
      let args = message.content.split(' ');
      if(args[1]) {
        if(args[2] > 10){
          args[2] = 10;
        } else {
          if(!args[2]) { args[2] = 1; }
        }
        let tweetParams = {
          q: '#' + args[1],
          count: args[2],
          result_type: 'recent',
          lang: 'en',
          exclude_replies: 'true'
        };
        console.log(tweetParams);
        // Initiate your search using the above paramaters
        twitterApi.get('search/tweets', tweetParams, function(err, data, response) {
          // If there is no error, proceed
          if(!err){
            message.reply(':white_check_mark: Récupération automatiques de `' + args[2] + '` tweets pour **' + args[1] + '**');
            // Loop through the returned tweets
            for(let i = 0; i < data.statuses.length; i++){
              // Get the tweet Id from the returned data
              message.reply(`https://twitter.com/i/web/status/${data.statuses[i].id_str}`);
            }
          } else {
            message.reply(err);
          }
        });
      } else {
        message.reply(':warning: Veuillez entrer un hashtag \n - Usage : !hashtagtweet {theme} {option : **nombre(default: 1, max: 10)**} \n - Exemple: !hashtagtweet memes 4)');
      }
  };

  static help() {
    return {
      mod: "twitter",
      corps: "\n **Afficher les derniers tweets d'un hashtag :**" 
      + "\n ***!hashtagtweet*** *{theme} {option : nombre(default: 1, max: 10)}*"
      + "\n Exemple : !hashtagtweet memes 2 \n \n",
    };
  };
}