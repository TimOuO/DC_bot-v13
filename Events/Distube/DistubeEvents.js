const client = require("../../Structures/index");
const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: "DistubeEvents",
}
const status = queue =>
    `音量: \`${queue.volume}%\` | 篩選: \`${queue.filters.join(', ') || '關閉'}\` | 循環: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? '全部' : '這首歌') : '關閉'
  }\` | 自動播放: \`${queue.autoplay ? '開啟' : '關閉'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🎵 | 播放 \`${song.name}\` - \`${song.formattedDuration}\`\n點歌人: ${song.user}\n${status(queue)}`)
            ]
        }))


    .on('addSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🎵 | 新增 \`${song.name}\` - \`${song.formattedDuration}\` 點歌人: ${song.user}`)
            ]
        }))

    .on('addList', (queue, playlist) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🎵 | 新增 \`${playlist.name}\` 到播放列表 `)
            ]
        }))

    .on('error', (channel, e) => {
        channel.send({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ | 遇到錯誤: ${e}`)
            ]
        })
    })

    .on('empty', (channel) => {
        channel.send({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`語音頻道是空的！ 只好離開頻道... 😢`)
            ]
        })
    })

    .on('searchNoResult', (message, query) =>
        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ | 沒有找到相關結果 \`${query}\`!`)
            ]
        }))

    .on('finish', queue => queue.textChannel.send({
        embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`全部播放完畢囉~ 小的告退 🥳`)
        ]
    }))