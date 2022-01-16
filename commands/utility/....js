const { Message } = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : '...',
    category : 'Utlity',
    description : 'add member to ... Clan!',
    run : async(client, message, args) => {

        const target = message.mentions.members.first(); //target = mentions
        
        const channel = '930096508873896002';
        const yesEmoji = '✅';
        const noEmoji = '❌';

        let mainRole = message.guild.roles.cache.find(r => r.id === "931185411399761970")
    
        if(!message.member.roles.cache.has('932270384030556270')) return message.channel.send({
            embed: {
                color: 16777201,
                description: 'You need The `CLAN LEADER` Role to Add members!',

            }
        })
        if(!message.member.roles.cache.has('931185411399761970')) return message.channel.send({
            embed: {
                color: 16777201,
                description: "Yes You're The Clan leader but you need your clan Role (...) to add members!",

            }
        })

        if(!target) return message.channel.send({
            embed: {
                color: 16777201,
                description: 'Please Specify a member', //when no target is mentioned

            }
        })

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`**Add Request ⁉**`)
        .setDescription(`<@${target.user.id}> Would you like to join ... Clan ?\n\n\n`
            + `${yesEmoji} to Accept\n`
            + `${noEmoji} to Refuse`)
        .setTimestamp()
                   
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yesEmoji);
        messageEmbed.react(noEmoji);
     
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
     
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(mainRole);
                    const embed = new MessageEmbed()
                    .setTitle('**Request Accepted ✅**')
                    .setColor('RANDOM')
                    .setDescription(`<@${target.user.id}> has accepted the request and joined ... Clan !`)
                    .setThumbnail('https://cdn.discordapp.com/icons/921346552407142400/a_abb3f32c9e4d68260d962f51175f2db8.gif?size=4096')
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Recruited By :', value: `<@${message.author.id}>`, inline:true},
                        { name: 'Memeber ID',       value: `\`${target.user.id}\``, inline: true }
                    )
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (reaction.emoji.name === noEmoji) {
                    await reaction.message.guild.members.cache.get(user.id)
                    const embed1 = new MessageEmbed()
                    .setTitle('**Request Refused ❌**')
                    .setColor('RANDOM')
                    .setDescription(`<@${target.user.id}> has refused the request and didn't join the ... Clan !`)
                    .setThumbnail('https://cdn.discordapp.com/icons/921346552407142400/a_abb3f32c9e4d68260d962f51175f2db8.gif?size=4096')
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed1)
                }
            } else {
                return;
            }
 
        });
    }
}
