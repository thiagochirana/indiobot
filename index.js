require("dotenv").config()

require("./discord/discord_bot")
require("./twitch/jobs/livestream_notifier")
require("./twitch/twitch_bot")

console.log("Bots iniciados!")