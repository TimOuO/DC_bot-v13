const {
    CommandInteraction,
    Client
} = require("discord.js");

module.exports = {
    name: "測試指令", // emitt 
    description: "新增的成員或離開的成員", // Event emitter 
    permission: "ADMINISTRATOR",
    options: [{
        name: "成員", //member 
        description: "成員在伺服器的活動", // Guild Member Events 
        type: "STRING",
        required: true,
        choices: [{
                name: "新增的成員", // guildMemberAdd
                value: "guildMemberAdd"
            },
            {
                name: "離開的成員", // guildMemberRemove
                value: "guildMemberRemove"
            },
            {
                name: "贊助的成員", // guildMemberUpdate
                value: "guildMemberUpdate"
            }
        ]
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString("成員"); // member

        switch (choices) {
            case "guildMemberAdd": {
                client.emit("guildMemberAdd", interaction.member);
                interaction.reply({
                    content: "發送事件", // Emitted the event. 
                    ephemeral: true
                })
            }
            break;
        case "guildMemberRemove": {
            client.emit("guildMemberRemove", interaction.member);
            interaction.reply({
                content: "發送事件", // Emitted the event.
                ephemeral: true
            })
        }
        break;
        case "guildMemberUpdate": {
            client.emit("guildMemberUpdate", interaction.member);
            interaction.reply({
                content: "發送事件", // Emitted the event.
                ephemeral: true
            })
        }
        break;
        }
    }
}