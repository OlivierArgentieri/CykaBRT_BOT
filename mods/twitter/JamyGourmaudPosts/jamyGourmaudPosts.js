class JD_Post
{
    id;
    text;
    url;

    constructor(_id, _text, _url)
    {
        this.id = id;
        this.text = _text;
        this.url = _url;
    }

    serialize() {

        return {
            id: this.username, 
            text: this.userID, 
            url: this.presenceValue
            }
    }
}

module.exports = JD_Post;