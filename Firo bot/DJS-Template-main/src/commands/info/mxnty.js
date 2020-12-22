const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor(10181046)
    .setTitle('mxnty') 
    .addField(`mxnty`)
    .setDescription('mxnty')
    .setFooter(createdTimestamp)
    message.channel.send(embed);
}
module.exports.config = {
    name: 'ping',
    description: 'checks the latency of the discord bots connection to discords API',
    category: 'info',
    usage: 'ping',
    example: '...',
  
    ownerOnly: true,
    guildOnly: false
}
