const axios = require("axios");
const client = require("../discord/discord_bot");
const embed = require("../discord/messages/embed");
const { Colors } = require("discord.js");

let is_live = false;

async function verifyStatus() {
    try {
        const res = await axios.get('https://decapi.me/twitch/uptime/DevCurumin');
        response = res.data;
        if (response.includes('offline')){
          if (is_live) {
            is_live = false
          }
        } else {
          if(!is_live) {
            is_live = true;
            const res = await axios.get('https://decapi.me/twitch/title/DevCurumin');
            emb = embed.create(
                `LIVE ON! ${res.data}`,
                "Estou online, vem ver!\n\nhttps://www.twitch.tv/devcurumin/",
                Colors.Purple,
                "https://static-cdn.jtvnw.net/previews-ttv/live_user_devcurumin-400x225.jpg"
            )
            client.channels.fetch('1262877455924985948')
                .then( channel => channel.send({ embeds: [emb], content: "@everyone" }) );
          }
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

setInterval(verifyStatus, 1000);