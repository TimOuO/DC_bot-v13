const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");


module.exports = {
    name: "自我介紹",
    description: "想瞭解我就使用這個指令呦 😊",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription("是一位小小的 QA 所創造，請多多指教 ❤️")
            .setAuthor({
                name: '阿肥肥專用',
                iconURL: client.user.displayAvatarURL(),
                url: 'https://github.com/TimOuO/'
            })
            .setThumbnail("https://cdn.discordapp.com/avatars/324574832748658688/256cd0b7bf05034adced2182fab302bb.webp")
            .addFields({
                name: `\u200B`,
                value: `\u200B`
            }, {
                name: `${client.user.tag}`,
                value: `請問有甚麼吩咐?`
            }, {
                name: `系統命令`,
                value: `可以使用 "/" 調用相關指令喔~`
            })
            .setImage("https://cdn.discordapp.com/attachments/960812835837976576/965239511430856725/love.gif")
            .setTimestamp()
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.displayAvatarURL()
            });

        interaction.reply({
            embeds: [Response]
        });
    }
}