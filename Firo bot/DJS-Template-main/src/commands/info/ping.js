const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor(1752220)
    .setTitle('Ping') 
    .addField(`the bots current ping , \`${Date.now() - message.createdTimestamp}\` ms`)
    .setDescription('ping')
    .setFooter('Ethereal Ark Bot by xFijo')
    .setTimestamp()
    message.channel.send(embed);
}
module.exports.config = {
    name: 'ping',
    description: 'checks the latency of the discord bots connection to discords API',
    category: 'info',
    usage: 'ping',
    example: '...',
  
    ownerOnly: false,
    guildOnly: false
}
