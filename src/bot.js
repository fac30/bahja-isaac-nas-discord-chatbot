const { Client } = require('discord.js');
const { handleMessage } = require('./messageHandler');

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

client.on('messageCreate', async (message) => {
  handleMessage(client, message);
});

client.login(process.env.TOKEN);

module.exports = { client };
