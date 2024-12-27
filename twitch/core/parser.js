module.exports = {
    message: function (message) {
        const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PRIVMSG #(\w+) :(.+)/;
        const match = message.match(regex);

        if (!match) {
            return null;
        }

        return {
            username: match[1],
            user_id: match[2],
            domain: match[3],
            channel: match[4],
            message: match[5]
        };
    }
}