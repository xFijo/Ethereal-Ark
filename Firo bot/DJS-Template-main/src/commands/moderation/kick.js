const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member) return;
}
module.exports.config = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    category: 'info',
    aliases: ['k'],
    usage: '<member> [reason]',
    example: '@xFijo Asked for it',
  
    ownerOnly: false,
    guildOnly: false
}
