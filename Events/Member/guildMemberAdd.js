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
    name: "guildMemberAdd", // 公會成員添加 guildMemberAdd
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const {
            user,
            guild
        } = member;

        member.roles.add("960812302062473246") // 複製想要添加的 "身分組 ID"

        const Welcomer = new WebhookClient({
            // 到任意頻道 設定>整合>Webhook>建立一個並複製URL
            id: MemberWebhookId,
            token: MemberWebhookToken
        });

        const Welcome = new MessageEmbed()
            .setColor("PURPLE")
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
            .setDescription(`歡迎 ${member} 來到 **${guild.name}**!\n
            創造帳號時間: <t:${parseInt(user.createdTimestamp/1000)}:R>\n
            會員人數: **${guild.memberCount}**`)
            .setFooter({
                text: `會員 ID: ${user.id}`
            })

        Welcomer.send({
            embeds: [Welcome]
        })
    }
}