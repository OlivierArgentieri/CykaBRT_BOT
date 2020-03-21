class JG_Post
{
    id;
    text;
    url;

    constructor(_id, _text, _url)
    {
        this.id = _id;
        this.text = _text;
        this.url = _url;
    }

    serialize() {

        return {
            id: this.id, 
            text: this.text, 
            url: this.url
            }
    }
}

module.exports = JG_Post;