const { MongoClient } = require('mongodb');
const User = require('./jamyGourmaudPost.js');
const config = require('../../../config.json');
const repository = require('./jamyGourmaudRepository');

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


async function main() {

    const jamyGourmaud_ID = 4127289801;
    JG_Post = null;
    twitterApi.get('statuses/user_timeline', {user_id: jamyGourmaud_ID}, function(err, data, response) {
        if(err) return;
        console.log(data[0].text);
    });

    /*
    const uri = "mongodb+srv://"+config.MongoDB.username+":" +config.MongoDB.password+ "@" + config.MongoDB.urlBDD+"?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

     try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 

        if(await repository.findOneListingByPostID(client, config.MongoDB.nameBDD, config.MongoDB.collectionName[1], message.member.user.id) != 0)
        {
        }
        else
        {
            var _testUSer = new User(message.member.user.username, message.member.user.id,0);
            await createListing(client, config.MongoDB.nameBDD, config.MongoDB.collectionName[0], _testUSer.serialize());
        }
      

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }    */
}