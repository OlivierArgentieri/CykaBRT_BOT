class User
{
    username;
    userID;
    presenceValue;

    constructor(username, userID, presenceValue)
    {
        this.username = username;
        this.userID = userID;
        this.presenceValue = presenceValue;
    }

    serialize() {

        return {
            username: this.username, 
            userID: this.userID, 
            presenceValue: this.presenceValue
            }
    }
}

module.exports = User;