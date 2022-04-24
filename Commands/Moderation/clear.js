const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "清除訊息", // clear 清除
    description: "在此頻道刪除最後 N 則訊息 or 此頻道特定人物的 N 則訊息", // Deletes a specified number of messages from a channel or a target.
    permission: "MANAGE_MESSAGES",
    options: [{
            name: "數量", //amount
            description: "選擇要刪除訊息的數量(從最新的開始刪)", //Select the amount of messages to delete from a channel or a target.
            type: "NUMBER",
            required: true
        },
        {
            name: "目標", // target
            description: "選擇要刪除訊息的人", // Select a target to clear their messages.
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const {
            channel,
            options
        } = interaction;

        const Amount = options.getNumber("數量");
        const Target = options.getMember("目標");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("PURPLE")

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 清除來自 ${Target} 的 ${messages.size} 則訊息`);
                interaction.reply({
                    embeds: [Response]
                });
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 清除此頻道 ${messages.size} 則訊息`);
                interaction.reply({
                    embeds: [Response]
                });
            })
        }
    }
}