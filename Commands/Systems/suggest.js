const {
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "建議",
    description: "建立一個建議，我將會收到~",
    permission: "ADMINISTRATOR",
    options: [{
        name: "類型",
        description: "選擇一個選項",
        type: "STRING",
        required: true,
        choices: [{
                name: "指令相關",
                value: "指令相關"
            },
            {
                name: "活動相關",
                value: "活動相關"
            },
            {
                name: "系統相關",
                value: "系統相關"
            },
            {
                name: "其它",
                value: "其它"
            }
        ]
    }, {
        name: "建議內容",
        description: "描述你的建議",
        type: "STRING",
        required: true
    }],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {
            options,
            guildId,
            member,
            user
        } = interaction;

        const Type = options.getString("類型");
        const Suggestion = options.getString("建議內容");

        const Embed = new MessageEmbed()
            .setColor("NAVY")
            .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL({
                    dynamic: true
                })
            })
            .addFields({
                name: "建議",
                value: Suggestion,
                inline: false
            }, {
                name: "類型",
                value: Type,
                inline: true
            }, {
                name: "狀態",
                value: "尚未完成",
                inline: true
            })
            .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("sugges-accept").setLabel("✅ 送出").setStyle("PRIMARY"),
            new MessageButton().setCustomId("sugges-decline").setLabel("⛔ 取消").setStyle("SECONDARY"),
        )

        try {
            const M = await interaction.reply({
                embeds: [Embed],
                components: [Buttons],
                fetchReply: true
            })

            await DB.create({
                GuildID: guildId,
                MessageID: M.id,
                Details: [{
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion
                }]
            })
        } catch (err) {
            console.log(err);
        }
    }
}