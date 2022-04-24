const {
    CommandInteraction,
    Client,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "音樂",
    description: "音樂相關指令",
    permission: "ADMINISTRATOR",
    options: [{
        name: "播放", // play
        description: "播放歌曲",
        type: "SUB_COMMAND",
        options: [{
            name: "輸入", // query
            description: "貼上歌曲名子或 URL",
            type: "STRING",
            required: true
        }]
    }, {
        name: "音量", //volume
        description: "更改音量",
        type: "SUB_COMMAND",
        options: [{
            name: "百分比", // percent
            description: "輸入 1 ~ 100 = 相對應 %",
            type: "NUMBER",
            required: true
        }]
    }, {
        name: "設定",
        description: "選擇一個選項",
        type: "SUB_COMMAND",
        options: [{
            name: "選項",
            description: "選擇一個選項",
            type: "STRING",
            required: true,
            choices: [{
                    name: "播放列表", //queue
                    value: "播放列表"
                },
                {
                    name: "跳過", // skip
                    value: "跳過"
                },
                {
                    name: "暫停", // pause
                    value: "暫停"
                },
                {
                    name: "恢復播放", // resume
                    value: "恢復播放"
                },
                {
                    name: "停止", // stop
                    value: "停止"
                },
            ]
        }]
    }],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const {
            options,
            member,
            guild,
            channel
        } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({
                content: "必須在頻道中才能使用音樂指令",
                ephemeral: true
            });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({
                content: `我已經在 <#${guild.me.voice.channelId}> 播放音樂囉`,
                ephemeral: true
            });

        try {
            switch (options.getSubcommand()) {
                case "播放": {
                    client.distube.play(VoiceChannel, options.getString("輸入"), {
                        textChannel: channel,
                        member: member
                    });
                    return interaction.reply({
                        content: "歌曲準備中~"
                    });
                }
                case "音量": {
                    const Volume = options.getNumber("百分比");
                    if (Volume > 100 || Volume < 1)
                        return interaction.reply({
                            content: "必須輸入 1 ~ 100 之間的數"
                        });

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({
                        content: `🔊 音量已經被設置為 \`${Volume}%\``
                    });
                }
                case "設定": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if (!queue)
                        return interaction.reply({
                            content: "⛔ 沒有歌曲無法使用"
                        });

                    switch (options.getString("選項")) {
                        case "跳過":
                            await queue.skip(VoiceChannel);
                            return interaction.reply({
                                content: "⏭️ 跳過這首歌囉"
                            });
                        case "停止":
                            await queue.stop(VoiceChannel);
                            return interaction.reply({
                                content: "⏹️ 音樂停止囉"
                            });
                        case "暫停":
                            await queue.pause(VoiceChannel);
                            return interaction.reply({
                                content: "⏸️ 這首歌暫停囉"
                            });
                        case "恢復播放":
                            await queue.resume(VoiceChannel);
                            return interaction.reply({
                                content: "⏯️ 歌曲恢復播放囉"
                            });
                        case "播放列表":
                            const tracks = queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``);
                            const songLong = queue.songs.length;
                            const nextSongs = songLong > 10 ? `還有 **${songLong - 10}** 首歌` : `列表中還有 **${songLong}** 首歌`;
                            const embed = new MessageEmbed()
                                .setColor("PURPLE")
                                .setThumbnail(guild.iconURL({
                                    size: 2048,
                                    dynamic: true
                                }))
                                .setTitle(`播放列表`)
                                .setDescription(`\n\n${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
                                .setTimestamp()
                            return interaction.reply({
                                embeds: [embed]
                            });

                            //     .setDescription(`${queue.songs.map((song,id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                            // if (embed.length > 4096) {
                            //     return interaction.reply("列表過長囉...");
                            // } else
                            //     return interaction.reply({
                            //         embeds: [embed]
                            //     });
                    }
                    return;
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ 錯誤: ${e}`)
            return interaction.reply({
                embeds: [errorEmbed]
            });
        }
    }
}