const Discord = require('discord.js');
const config = require('../config');

const { Client, Collection } = require('discord.js');

const client = new Client({
    disableMentions: 'everyone'
});

require('./server');

const cooldowns = new Set();
client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
    require(`./${handler}`)(client);
});

client.on('ready', () => {
    // things before
    client.user.setActivity('£help  #ad  xFijo#0999', { type: 'WATCHING' }); 
});

client.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      try {
        if (cooldowns.has(message.author.id)) return message.channel.send('You are on cooldown! Please slow down!');
  
        if (command.ownerOnly && !config.owners.includes(message.author.id)) return message.channel.send('This command is restricted to the owners.');
        if (!message.guild && command.guildOnly) return message.channel.send('You can only use this command in a server!');
  
        await command.run(client, message, args);
        if (!config.owners.includes(message.author.id)) cooldowns.add(message.author.id);

        setTimeout(async () => {
          await cooldowns.delete(message.author.id);
        }, config.commandCooldown * 1000);
      } catch (err) {
        message.channel.send(`the command  \`${command.config.name}\`, currently isnt working, please notify xFijo#0999 and try again later !!!.`);
        console.log(`An error occured while trying to run \`${command.config.name}\`!`);
        console.log(err);
      }
    }
});

client.login(config.token);
