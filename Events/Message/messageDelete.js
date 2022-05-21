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
    name: "messageDelete",
    /**
     * @param {Message} message 
     */
    execute(message) {
        if (message.author.bot) return; // 忽略機器人的回覆

        const Log = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`📕 ${message.author}在 ${message.channel} 頻道**刪除**一則[訊息](${message.url}) \n
            **刪除的訊息:** \n ${message.content ? message.content : "None"}`.slice("0", "4096"))

        if (message.attachments.size >= 1) {
            Log.addField(`附件:`, `${message.attachments.map(a=>a.url)}`, true)
        }

        new WebhookClient({
            id: LogWebhookId,
            token: LogWebhookToken
        }).send({
            embeds: [Log]
        }).catch((err) => console.log(err));
    }
}