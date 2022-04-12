const {
    ContextMenuInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "用戶資訊", // userinfo 用戶資訊
    type: "USER",
    permission: "ADMINISTRATOR",
    context: true,
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor({
                name: target.user.tag,
                iconURL: target.user.avatarURL({
                    dynamic: true,
                    size: 512
                })
            })
            .setThumbnail(target.user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .addField("ID", `${target.user.id}`)
            .addField("身分組", `${target.roles.cache.map(r=>r).join(" ").replace("@everyone"," ")||"None"}`) // Roles
            .addField("加入伺服器時間", `<t:${parseInt(target.joinedTimestamp/1000)}:R>`, true) // Member Since
            .addField("創造帳號時間", `<t:${parseInt(target.user.createdTimestamp/1000)}:R>`, true) // Discord User Since

        interaction.reply({
            embeds: [Response],
            ephemeral: true
        })
    }
}