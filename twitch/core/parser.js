module.exports = {
    message: function (message) {
        const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PRIVMSG #(\w+) :(.+)/;
        const match = message.match(regex);

        if (!match) {
            return null;
        }

        return {
            username: match[1],
            message: match[5]
        };
    }
}