const {
    MessageEmbed,
    Message,
    WebhookClient
} = require("discord.js");
const {
    LogWebhookId,
    LogWebhookToken
} = require("../../Structures/config.json");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return; // 忽略機器人的回覆

        if (oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

        const Log = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`📘 ${newMessage.author}在 ${newMessage.channel}頻道**編輯**一則[訊息](${newMessage.url}) \n
        **原樣:** \n ${Original} \n**編輯後:**\n ${Edited}`.slice("0", "4096"))
            .setFooter({
                text: `會員: ${newMessage.author.tag} | ID: ${newMessage.author.id}`
            });

        new WebhookClient({
            id: LogWebhookId,
            token: LogWebhookToken
        }).send({
            embeds: [Log]
        }).catch((err) => console.log(err));
    }
}