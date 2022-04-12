const {
    MessageEmbed,
    WebhookClient,
    GuildMember
} = require("discord.js");

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
            // 胖胖 https://discord.com/api/webhooks/960808316827746314/RzlZwCGjGjqz1B8lT9669ChyyWY9BA5m2d6tP_bNlZvH3YhD1BonMC_DA_aBiqO8J5BE
            id: "960808316827746314",
            token: "RzlZwCGjGjqz1B8lT9669ChyyWY9BA5m2d6tP_bNlZvH3YhD1BonMC_DA_aBiqO8J5BE"
            // 烏干達 https://discord.com/api/webhooks/960084224273154068/tXGWo6YWAKgCMJXQN8vcAirq1evt1nSyCOHCEIDhdI78G0aNX9iyIZ9HuCDPIx6NikUj
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
            會員人數: **${guild.memberCount}**`) // Account Created Latest Member Count
            .setFooter({
                text: `會員 ID: ${user.id}`
            })

        Loger.send({
            embeds: [Welcome]
        })
    }
}