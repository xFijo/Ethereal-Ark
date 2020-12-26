const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have permissions to execute this command.');
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I don\'t have permissions to ban members.\nMissing permissions: `BAN MEMBERS`');
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(mem => mem.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase())
            || message.guild.members.cache.find(mem => mem.user.tag.toLowerCase() === args.slice(0).join(' ').toLowerCase());
    
    if (!member) return message.channe.send('Please provide a member to ban.');
    if (member.id === message.author.id) return message.channel.send('You can\'t ban yourself.');
    if (member.roles.highest.position >= message.member.roles.highest.position && message.guild.owner.id !== message.author.id) return message.channel.send('You can\'t ban someone that has a higher role or the same position than you.');
    if (member.roles.highest.position >= message.guild.me.roles.highest.position && message.guild.owner.id !== client.user.id) return message.channel.send('I can\'t ban someone that has a higher role or the same position than me.');
    
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given';
    
    const embed = new MessageEmbed()
    .setColor('RED')
    .setAuthor('Ban', message.author.displayAvatarURL({dynamic:true}))
    .addField('Member', `${member.user.tag} (${member.id})`, true)
    .addField('Moderator', `${message.author.tag} (${message.author.id})`, true)
    .setFooter('Ethereal Ark Bot by xFijo')
    .setTimestamp()
    embed.addField('Reason', reason, true);
    
    let c = message.guild.channels.cache.find(c => c.name.includes('log'));

    await member.ban({reason: reason});
    message.channel.send(embed).then(m => m.delete({timeout: 10000}));
    member.send(`You got banned from ${message.guild.name} for ${reason}`);
    
    if (c) c.send(embed);
}
module.exports.config = {
    name: 'ban',
    description: 'Bans a member from the server.',
    category: 'moderation',
    aliases: ['b'],
    usage: '<member> [reason]',
    example: '@xFijo Asked for it',
  
    ownerOnly: false,
    guildOnly: true
}
