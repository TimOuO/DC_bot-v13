const {
    MessageEmbed,
    Message,
    WebhookClient
} = require("discord.js");

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
            url: "https://discord.com/api/webhooks/960810781220438086/kvz-CKMtY803inaSKG1nNRvk2exh2eIQG3AWJslUAweX7m8Sq00SKv-1fuf5brbzzlxA"
            /**
             * 胖胖: https://discord.com/api/webhooks/960810781220438086/kvz-CKMtY803inaSKG1nNRvk2exh2eIQG3AWJslUAweX7m8Sq00SKv-1fuf5brbzzlxA
             * 烏干達: https://discord.com/api/webhooks/960789311580672000/sMrpqSw1p6a_L9_T4ZB6U1tMLkj2_MiMxUqNaIviTtyKP4FUDPuWC1S_q2jFM9Ii_pPO
             */
        }).send({
            embeds: [Log]
        }).catch((err) => console.log(err));
    }
}