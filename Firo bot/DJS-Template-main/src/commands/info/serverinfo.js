const { MessageEmbed } = require('discord.js');

const yes = '<:yes:782666996717715457>';
const no = '<:no:782667011665952799>';

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
  .setColor(1752220)
  .setThumbnail(message.guild.iconURL({dynamic:true}))
  .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
  .addField('General', `Owner: ${message.guild.owner}\nRegion: ${message.guild.region}\nMembers: ${message.guild.memberCount}\nText Channels: ${message.guild.channels.cache.filter(x => x.type === 'text').size}\nVoice Channels: ${message.guild.channels.cache.filter(x => x.type === 'voice').size}`)
  .addField('Status', `Large: ${message.guild.large ? yes : no}\nVerified: ${message.guild.verified ? yes : no}\nPartnered: ${message.guild.partnered ? yes : no}\nServer Boost Level: ${message.guild.premiumTier}`)
  .setFooter('Ethereal Ark Bot by xFijo')
  .setTimeStamp()
  message.channel.send(embed);
}

module.exports.config = {
    name: 'serverinfo',
    description: 'Sends information of the server.',
    category: 'info',
    aliases: ['si'],
    usage: ' ',
    example: ' ',
  
    ownerOnly: false,
    guildOnly: true
}
