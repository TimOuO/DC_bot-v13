const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor("RED")
                    .setDescription("⛔ 執行此命令時發生錯誤") // An error occurred while running this command.
                ]
            }) && client.commands.delete(interaction.commandName);

            if (!interaction.member.permissions.has(command.permission)) {
                return interaction.reply({
                    content: `您沒有此命令所需的權限: \`${interaction.commandName}\``,
                    ephemeral: true
                })
            }
            command.execute(interaction, client);
        }
    }
}