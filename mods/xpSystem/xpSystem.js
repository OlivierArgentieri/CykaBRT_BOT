const {MongoClient} = require('mongodb');
const User = require('./User.js');
const config = require('../../config.json');
module.exports = class Command {
    static parse(message){
        if(this.match(message)) {
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
        main(message);
    };
  }





async function main(message)
{
    const uri = "mongodb+srv://"+config.MongoDB.username+":" +config.MongoDB.password+ "@" + config.MongoDB.urlBDD+"?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

     try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 

        if(await findOneListingByUserID(client, config.MongoDB.nameBDD, config.MongoDB.collectionName, message.member.user.id) != 0)
        {
            console.log(result);
            var _testUSer = new User(result.username, result.userID, result.presenceValue);
            _testUSer.presenceValue +=1;
            await updateListingByUserID(client, config.MongoDB.nameBDD, config.MongoDB.collectionName, _testUSer.userID, _testUSer.serialize());
        }
        else
        {
            var _testUSer = new User(message.member.user.username, message.member.user.id,0);
            await createListing(client, config.MongoDB.nameBDD, config.MongoDB.collectionName, _testUSer.serialize());
        }
      

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }    
}


// --------------- Repository Function
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// -------  CRUD

// Create
async function createListing(client, databaseName, collectionName, newListing ){
    const result = await client.db(databaseName).collection(collectionName).insertOne(newListing);
    //console.log(`New listing created with the following id: ${result.insertedId}`);
}

// Read
async function findOneListingByUserID(client, databaseName, collectionName, userIDvalue) {
    result = await client.db(databaseName).collection(collectionName).findOne({ userID: userIDvalue });

    if (result) 
    {
        console.log(`Found a listing in the collection with the name '${userIDvalue}':`);

        return result;
    } 
    else 
    {
        console.log(`No listings found with the name '${userIDvalue}'`);
        console.log("Not Found");
        return 0;
    }
}

// Update
async function updateListingByUserID(client,  databaseName, collectionName, userIDvalue, updatedListing) 
{
    result = await client.db(databaseName).collection(collectionName).updateOne({ userID: userIDvalue }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}