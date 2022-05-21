const {
    Message,
    MessageEmbed
} = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystemDB");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message 
     */
    async execute(message) {
        if (message.author.bot) return;

        await DB.deleteOne({
            GuildID: message.guild.id,
            UserID: message.author.id
        });

        if (message.mentions.members.size) {
            const Embed = new MessageEmbed()
                .setColor("RED")
            message.mentions.members.forEach((m) => {
                DB.findOne({
                    GuildID: message.guild.id,
                    UserID: m.id
                }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        Embed.setDescription(`${m} 的 AFK 時間 <t:${data.Time}:R>\n **狀態**: ${data.Status}`);
                        return message.reply({
                            embeds: [Embed]
                        });
                    }
                })
            })
        }
    }
}