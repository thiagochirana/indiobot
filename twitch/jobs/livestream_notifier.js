const axios = require("axios");
const cron = require('node-cron');
const client = require("../../discord/discord_bot");
const embed = require("../../discord/functions/embed");
const { Colors } = require("discord.js");

let notified = false;

cron.schedule('* * * * *', async () => {
  try {
    const uptime = await axios.get('https://decapi.me/twitch/uptime/DevCurumin').data;

    if (uptime.includes("offline")) return notified = false;
    if (notified) return;

    const title = await axios.get('https://decapi.me/twitch/title/DevCurumin').data;

    const emb = embed.create({ title: `LIVE ON! ${title}`, description: "Estou online, vem ver!\nhttps://www.twitch.tv/devcurumin/", color: Colors.Purple, imageUrl: "https://static-cdn.jtvnw.net/previews-ttv/live_user_devcurumin-400x225.jpg" })

    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_LIVE_NOTIFICATION)
    channel.send({ embeds: [emb], content: "@everyone" })

    notified = true;
  } catch (error) {
    console.error('Erro:', error.message);
  }
}, { runOnInit: true }).start();