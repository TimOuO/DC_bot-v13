const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "投票", // suggest
    description: "用表情符號來投票", // Create a suggestion in an orginized matter.
    options: [{
        name: "類型", //type 
        description: "選擇類型", // Select the type.
        type: "STRING",
        required: true,
        choices: [{
                name: "想法",
                value: "想法"
            },
            {
                name: "活動",
                value: "活動"
            },
            {
                name: "表決",
                value: "表決"
            }
        ]
    }, {
        name: "名稱", // name
        description: "幫你的名稱命名", //Provide a name for your suggestion.
        type: "STRING",
        required: true
    }, {
        name: "內容", // functionality
        description: "輸入內容", // Describe the functionality of this suggestion.
        type: "STRING",
        required: true
    }, ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const {
            options
        } = interaction;

        const type = options.getString("類型");
        const name = options.getString("名稱");
        const funcs = options.getString("內容");

        const Response = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`${interaction.member} 提出了一個 ${type}`) //has suggested a
            .addField("名稱", `${name}`, true) // Name
            .addField("內容", `${funcs}`, true) // Functionality
        const message = await interaction.reply({
            embeds: [Response],
            fetchReply: true
        })
        message.react("❤️") // 文字頻道發送 \選擇表情符號 -> "<:LINE_ALBUM__220206:939870295639080981>"
        message.react("🧡")
        message.react("💛")
        message.react("💚")
        message.react("💙")
        message.react("💜")
        message.react("💗")
        // message.react("\<:0123:939868435515604992>")
    }
}