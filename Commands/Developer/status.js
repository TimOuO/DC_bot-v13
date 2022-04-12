const {
    Client,
    MessageEmbed,
    CommandInteraction
} = require("discord.js");
const {
    connection
} = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "狀態", // status
    description: "顯示機器人和資料庫連接的狀態。", // Displays the status of the client and database connection.
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const Response = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`**機器人**: \`🟢 上線\` - \`${client.ws.ping}ms\`\n 
            **運行時間**: <t:${parseInt(client.readyTimestamp/1000)}:R>\n 
            **資料庫**: \`${switchTo(connection.readyState)}\``) //Client ONLINE Uptime Database

        interaction.reply({
            embeds: [Response]
        })
    }
}

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `🔴 斷開連接` // DISCONNECTED
            break;
        case 1:
            status = `🟢 連接` // CONNECTED
            break;
        case 2:
            status = `🟠 連接中` // CONNECTING
            break;
        case 3:
            status = `🟣 斷開中` // DISCONNECTING
            break;
    }
    return status
}