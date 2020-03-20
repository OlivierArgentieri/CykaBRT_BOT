class User
{
    username;
    userID;
    presenceValue;

    constructor(username, userID)
    {
        this.username = username;
        this.userID = userID;
        this.presenceValue = 0;
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