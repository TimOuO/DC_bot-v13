const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystemDB");

module.exports = {
    name: "暫離",
    description: "AFK (Away from keyboard) 系統",
    // permission: "ADMINISTRATOR",
    options: [{
            name: "設定",
            type: "SUB_COMMAND",
            description: "設定你的 AFK (Away from keyboard) 狀態",
            options: [{
                name: "狀態",
                description: "設定你的狀態",
                type: "STRING",
                required: true
            }]
        },
        // {
        //     name: "回來",
        //     type: "SUB_COMMAND",
        //     description: "回來到電腦前"
        // }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {
            guild,
            options,
            user,
            createdTimestamp
        } = interaction;

        const Embed = new MessageEmbed()
            .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL({
                    dynamic: true
                })
            });

        const afkStauts = options.getString("狀態");

        try {
            switch (options.getSubcommand()) {
                case "設定": {
                    await DB.findOneAndUpdate({
                        GuildID: guild.id,
                        UserID: user.id
                    }, {
                        Status: afkStauts,
                        Time: parseInt(createdTimestamp / 1000)
                    }, {
                        new: true,
                        upsert: true
                    })

                    Embed.setColor("GREEN").setDescription(`你的 AFK 狀態更新為: ${afkStauts}`);
                    return interaction.reply({
                        embeds: [Embed],
                        ephemeral: true
                    });
                }
                // case "回來": {
                //     await DB.deleteOne({
                //         GuildID: guild.id,
                //         UserID: user.id
                //     });

                //     Embed.setColor("RED").setDescription(`你的 AFK 狀態被移除`);
                //     return interaction.reply({
                //         embeds: [Embed],
                //         ephemeral: true
                //     });
                // }
            }
        } catch (err) {
            console.log(err);
        }
    }
}