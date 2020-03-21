

module.exports = class JG_Repository {


    // --------------- Repository Function
    static async listDatabases(client) {
        var databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };


    // -------  CRUD

    // Create
    static async createListing(_client, _databaseName, _collectionName, newListing) {
        const result = await _client.db(_databaseName).collection(_collectionName).insertOne(newListing);
        console.log(`New listing created in  with the following id: ${result.insertedId}`);
    }

    // Read
    static async findOneListingByPostID(_client, _databaseName, _collectionName, _postID) {
        const result = await _client.db(_databaseName).collection(_collectionName).findOne({ id: _postID });

        if (result) {
            console.log(`Found a listing in the collection with the ID '${_postID}':`);

            return result;
        }
        else {
            console.log(`No listings found with the ID '${_postID}'`);
            console.log("Not Found");
            return 0;
        }
    }
};
