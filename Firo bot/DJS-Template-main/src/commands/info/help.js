const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  let command = client.commands.get(args[0]);
  if (!command) command = client.commands.get(client.aliases.get(args[0]));
  
  const commands = {
    info: client.commands.filter(x => x.config.category === 'info'),
    moderation: client.commands.filter(x => x.config.category === 'moderation')
  };
  
  if (command) {
    const embed = new MessageEmbed()
    .setColor(10181046)
    .setTitle('Command')
    .setDescription(`Command information for ${command.config.name}.
    .setFooter('Firo Bot by xFijo and mxnty')
    **-** Name: **${command.config.name}**
    **-** Description: **${command.config.description}**
    **-** Category: **${command.config.category}**
    **-** Aliases: **${command.config.aliases ? command.config.aliases.map(x => x).join(', ') : 'None'}**
    **-** Usage: **${command.config.name} ${command.config.usage}**
    **-** Example: **${command.config.name} ${command.config.example}**`)
    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setColor(10181046)
    .setTitle('Commands')
    .addField(`Information [${commands.info.size}]`, commands.info.map(x => `\`${x.config.name}\``).join(', '))
    //.addField(`Moderation [${commands.moderation.size}]`, commands.moderation.map(x => `\`${x.config.name}\``).join(', '))
    .setFooter('cheese on a sunday')
    .setTimestamp()
    message.channel.send(embed)
  }
}

module.exports.config = {
    name: 'help',
    description: 'Sends a list of the commands that you can use.',
    category: 'info',
    aliases: ['h'],
    usage: '[command]',
    example: '[command]',
  
    ownerOnly: false,
    guildOnly: false
}
