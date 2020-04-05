const { MongoClient } = require('mongodb');
const JG_Post = require('./jamyGourmaudPost.js');
const config = require('../../../config.json');
const JG_Repository = require('./jamyGourmaudRepository');

// init twitter api 
const Twitter = require('twitter');
const twitterApi = new Twitter(config.twitter_credentials);

// discord input / output action
module.exports = class Command {
    static parse(message) {
        if (this.match(message)) {
            this.action(message);
            return true;
        }
        return false;
    };

    static match(message) {
        console.log(message.member.user.id);
        return true;
    };

    static action(message) {
        main();
    };
}


module.exports = class JG_AutomaticPost {
   static async main(discord_client) {

        const jamyGourmaud_ID = 4127289801;
        var Posts = [];
        twitterApi.get('statuses/user_timeline', { user_id: jamyGourmaud_ID, tweet_mode: "extended" }, function (err, data, response) {

            if (err) return;

            data.forEach(e => {
                if (e.full_text.toUpperCase().includes('CONFINEMENT') && e.full_text.toUpperCase().includes('JOUR')) {
                    Posts.push(new JG_Post(e.id, e.full_text, e.entities.media[0].expanded_url));
                }
            });



        });


        const uri = "mongodb+srv://" + config.MongoDB.username + ":" + config.MongoDB.password + "@" + config.MongoDB.urlBDD + "?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            // Make the appropriate DB calls
            await JG_Repository.listDatabases(client);

            for(const post of Posts)
            {
                console.log(post.id);
                if (await JG_Repository.findOneListingByPostID(client, config.MongoDB.nameBDD, config.MongoDB.collectionName[1], post.id) != 0) {
                    console.log("Already Post");
                }
                else {
                    discord_client.channels.get(config.channel.jamyChannel).send(post.url); // test channel bot id :  690205415472103559
                    await JG_Repository.createListing(client, config.MongoDB.nameBDD, config.MongoDB.collectionName[1], post.serialize());
                }
            }
          

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
}