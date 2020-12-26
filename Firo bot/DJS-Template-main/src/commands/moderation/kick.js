const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You don\'t have permissions to execute this command.');
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I don\'t have permissions to kick members.\nMissing permissions: `KICK MEMBERS`');
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(mem => mem.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase())
            || message.guild.members.cache.find(mem => mem.user.tag.toLowerCase() === args.slice(0).join(' ').toLowerCase());
    
    if (!member) return message.channe.send('Please provide a member to kick.');
    
    let reason = args.slice(1).join(' ');
    
    const embed = new MessageEmbed()
    .setColor('ORANGE')
    .setAuthor('Kick', message.author.displayAvatarURL({dynamic:true}))
    .addField('Member', `${member.user.tag} (${member.id})`, true)
    .addField('Moderator', `${message.author.tag} (${message.author.id})`, true)
    .setTimestamp()
    if (reason) embed.addField('Reason', reason, true);
    
    let c = message.guild.channels.cache.find(c => c.name.includes('log'));

    await member.kick({reason: reason});
    message.channel.send(embed).then(m => m.delete({timeout: 10000}));
    
    if (c) c.send(embed);
}
module.exports.config = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    category: 'moderation',
    aliases: ['k'],
    usage: '<member> [reason]',
    example: '@xFijo Asked for it',
  
    ownerOnly: false,
    guildOnly: true
}
