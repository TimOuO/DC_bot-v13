const {
    MessageEmbed,
    WebhookClient,
    GuildMember
} = require("discord.js");
const {
    MemberWebhookId,
    MemberWebhookToken
} = require("../../Structures/config.json");

module.exports = {
    name: "guildMemberRemove", // 公會成員添加 guildMemberRemove
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const {
            user,
            guild
        } = member;

        const Loger = new WebhookClient({
            // 到任意頻道 設定>整合>Webhook>建立一個並複製URL
            id: MemberWebhookId,
            token: MemberWebhookToken
        });

        const Welcome = new MessageEmbed()
            .setColor("RED")
            .setAuthor({
                name: user.tag,
                iconURL: user.avatarURL({
                    dynamic: true,
                    size: 512
                })
            })
            .setThumbnail(user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .setDescription(`
             ${member} 已經離開伺服器\n
            加入時間: <t:${parseInt(member.joinedTimestamp/1000)}:R>\n
            會員人數: **${guild.memberCount}**`)
            .setFooter({
                text: `會員 ID: ${user.id}`
            })

        Loger.send({
            embeds: [Welcome]
        })
    }
}