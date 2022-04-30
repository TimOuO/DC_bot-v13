const {
    ButtonInteraction
} = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (!interaction.member.permissions.has("ADMINISTRATOR"))
            return interaction.reply({
                content: "你沒有權限使用這個按鈕",
                ephemeral: true
            });

        const {
            guildId,
            customId,
            message
        } = interaction;

        DB.findOne({
            GuildId: guildId,
            MessageID: message.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply({
                content: "資料庫找不到資料",
                ephemeral: true
            });

            const Embed = message.embeds[0];
            if (!Embed) return;

            switch (customId) {
                case "sugges-accept": {
                    Embed.fields[2] = {
                        name: "狀態",
                        value: "完成",
                        inline: true
                    };
                    message.edit({
                        embeds: [Embed.setColor("GREEN")],
                        components: [] // 讓按鈕點擊後會消失
                    });
                    return interaction.reply({
                        content: "收到建議囉",
                        ephemeral: true
                    })
                }
                break;
            case "sugges-decline": {
                Embed.fields[2] = {
                    name: "狀態",
                    value: "取消",
                    inline: true
                };
                message.edit({
                    embeds: [Embed.setColor("RED")],
                    components: []
                });
                return interaction.reply({
                    content: "取消了這個建議",
                    ephemeral: true
                })
            }
            break;
            }
        })
    }
}