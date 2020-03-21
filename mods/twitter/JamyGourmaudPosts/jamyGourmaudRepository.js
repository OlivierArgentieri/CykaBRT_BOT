
// --------------- Repository Function
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// -------  CRUD

// Create
async function createListing(_client, _databaseName, _collectionName, newListing ){
    const result = await _client.db(_databaseName).collection(_collectionName).insertOne(newListing);
    console.log(`New listing created in  with the following id: ${result.insertedId}`);
}

// Read
async function findOneListingByPostID(_client, _databaseName, _collectionName, _postID) {
    result = await _client.db(_databaseName).collection(_collectionName).findOne({ postID: _postID });

    if (result) 
    {
        console.log(`Found a listing in the collection with the ID '${_postID}':`);

        return result;
    } 
    else 
    {
        console.log(`No listings found with the ID '${_postID}'`);
        console.log("Not Found");
        return 0;
    }
}
