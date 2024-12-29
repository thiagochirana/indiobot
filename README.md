<p align="center">
    <img src="https://i.ibb.co/Kj42qXv/Indi-Bot-Logo-Png.png">
</p>

## About
This repository contains the a Twitch Chatbot and a Discord Chatbot (made with discord.js) for DevCurumin's livestream and discord group.

## Twitch Chatbot
> [!NOTE]  
> Chatbot stills in development and class methods may change.

Our Twitch Chatbot connects in the Twitch's chat WSS to listen for messages and reply to commands, see the diagram above and learn how it treats WSS events.

![](https://i.ibb.co/y5t1X1f/chatbot-diagram-drawio.png)

When we get a event from Twitch's WSS (that can be PING, PRIVMSG or WELCOME) we send it to Parser and then we send the parsed event to EventEmitter, which we use to listen for commands sent in chat and we send it to the accordingly command file.

Actually, Chatbot only supports receiving messages and sending messages (via &lt;bot&gt;.sendMessage(&lt;content: string&gt;)), you can see more viewing our code.

## Discord Chatbot
We use discord.js for our Discord Chatbot.
