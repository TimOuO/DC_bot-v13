const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "伺服器資訊",
    description: "看到伺服器相關的資訊~",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {
            guild
        } = interaction;

        const {
            createdTimestamp,
            ownerId,
            description,
            members,
            memberCount,
            channels,
            emojis,
            stickers
        } = guild;

        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor({
                name: guild.name,
                iconURL: guild.iconURL({
                    dynamic: true
                })
            })
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))
            .addFields({
                name: "💻 | 伺服器",
                value: [
                    `- 伺服器名: ${guild.name}`,
                    `- 創建時間: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                    `- 伺服器擁有者: <@${ownerId}>`,
                    `- 描述: ${description}`
                ].join("\n")
            }, {
                name: "💡 | 用戶",
                value: [
                    `- 成員: ${members.cache.filter((m)=>!m.user.bot).size} 位`,
                    `- 機器人: ${members.cache.filter((m)=>m.user.bot).size} 位`,
                    `- 用戶總數: ${memberCount} 位`,
                    `- 身分組: ${guild.roles.cache.size} 種`
                ].join("\n")
            }, {
                name: "📱 | 頻道",
                value: [
                    `- 文字: ${channels.cache.filter((c)=>c.type === "GUILD_TEXT").size} 個`,
                    `- 語音: ${channels.cache.filter((c)=>c.type === "GUILD_VOICE").size} 個`,
                    `- 線程: ${channels.cache.filter((c)=>c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_PUBLIC_THREAD").size} 個`,
                    `- 類別: ${channels.cache.filter((c)=>c.type === "GUILD_CATEGORY").size} 個`,
                    `- 舞台: ${channels.cache.filter((c)=>c.type === "GUILD_STAGE_VOICE").size} 個`,
                    `- 公告: ${channels.cache.filter((c)=>c.type === "GUILD_NEWS").size} 個`,
                    `總數: ${channels.cache.size}`
                ].join("\n")
            }, {
                name: "😺 | 表情符號 & 貼圖",
                value: [
                    `- GIF 動畫: ${emojis.cache.filter((e)=> e.animated).size} 個`,
                    `- 表情符號: ${emojis.cache.filter((e)=> !e.animated).size} 個`,
                    `- 貼圖: ${stickers.cache.size} 個`,
                    `總數: ${stickers.cache.size + emojis.cache.size} 個`
                ].join("\n")
            }, {
                name: "✨ | 伺服器加成 (NITRO)",
                value: [
                    `- 階級: ${guild.premiumTier.replace("TIER_","")}`,
                    `- 加成: ${guild.premiumSubscriptionCount} 次`,
                    `- 加成人數: ${members.cache.filter((m)=>m.premiumSince).size} 位`
                ].join("\n")
            })
            .setFooter({
                text: "時間:"
            }).setTimestamp();

        interaction.reply({
            embeds: [Embed]
        });
    }
}