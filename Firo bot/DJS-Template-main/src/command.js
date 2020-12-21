const { readdirSync } = require('fs');

module.exports = (client) => {
    readdirSync(__dirname + '/commands/').forEach(dir => {
      const commands = readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith('.js'));

      for (let file of commands) {
        let pull = require(__dirname + `/commands/${dir}/${file}`);
  
        if (pull.config.name) {
          client.commands.set(pull.config.name, pull);
        }

        if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => client.aliases.set(alias, pull.config.name));
      }
    });
}

/*
module.exports.run = async (client, message, args) => {
  // CODE
}

module.exports.config = {
    name: 'NAME',
    description: 'DESCRIPTION',
    category: 'CATEGORY',
    aliases: ['ALIASES'],
    usage: 'USAGE',
    example: 'EXAMPLE',
  
    ownerOnly: BOOLEAN,
    guildOnly: BOOLEAN
}
*/
