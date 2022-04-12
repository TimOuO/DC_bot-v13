const {
    MessageEmbed,
    WebhookClient,
    GuildMember
} = require("discord.js");

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
            // 胖胖 https://discord.com/api/webhooks/960808316827746314/RzlZwCGjGjqz1B8lT9669ChyyWY9BA5m2d6tP_bNlZvH3YhD1BonMC_DA_aBiqO8J5BE
            id: "960808316827746314",
            token: "RzlZwCGjGjqz1B8lT9669ChyyWY9BA5m2d6tP_bNlZvH3YhD1BonMC_DA_aBiqO8J5BE"
            // 烏干達 https://discord.com/api/webhooks/960084224273154068/tXGWo6YWAKgCMJXQN8vcAirq1evt1nSyCOHCEIDhdI78G0aNX9iyIZ9HuCDPIx6NikUj
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
            會員人數: **${guild.memberCount}**`) // Account Created Latest Member Count
            .setFooter({
                text: `會員 ID: ${user.id}`
            })

        Welcomer.send({
            embeds: [Welcome]
        })
    }
}