const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "贈品", // giveaway
    description: "蹭品系統",
    permission: "ADMINISTRATOR",
    options: [{
            name: "活動",
            description: "開始贈品活動",
            type: "SUB_COMMAND",
            options: [{
                    name: "持續時間", // duration
                    description: "輸入此贈品活動的持續時間（1m、1h、1d）",
                    type: "STRING",
                    required: true
                },
                {
                    name: "獲獎者", // winners
                    description: "輸入獲獎者的數量",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "獎品名稱", // prize
                    description: "輸入獎品的名稱",
                    type: "STRING",
                    required: true
                },
                {
                    name: "頻道", // channel
                    description: "選擇贈品活動發送的頻道",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "指令", // actions
            description: "贈品活動的指令", // Options for giveaways.
            type: "SUB_COMMAND",
            options: [{
                    name: "選項", // options
                    description: "選擇一個選項",
                    type: "STRING",
                    required: true,
                    choices: [{
                            name: "結束", // end
                            value: "結束"
                        },
                        {
                            name: "暫停", // pause
                            value: "暫停"
                        },
                        {
                            name: "取消暫停", // unpause
                            value: "取消暫停"
                        },
                        {
                            name: "重新開始", // reroll
                            value: "重新開始"
                        },
                        {
                            name: "刪除", // delete
                            value: "刪除"
                        },
                    ]
                },
                {
                    name: "訊息_id",
                    description: "提供贈品活動的訊息 ID", // Provide the message id of the giveaway.
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const {
            options
        } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
            .setColor("RED");

        const successEmbed = new MessageEmbed()
            .setColor("GREEN");

        switch (Sub) {
            case "活動": {

                const gchannel = options.getChannel("頻道") || interaction.channel;
                const duration = options.getString("持續時間");
                const winnerCount = options.getInteger("獲獎者");
                const prize = options.getString("獎品名稱");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "🎉 **贈品開始囉** 🎉", // GIVEAWAY STARTED
                        giveawayEnded: "🎊 **贈品結束囉** 🎊", // GIVEAWAY ENDED
                        inviteToParticipate: "點擊 Emojia 參與贈品活動!",
                        winMessage: '恭喜 {winners}~ 你贏得 **{this.prize}**!! 😘', // Congratulations, {winners}! You won **{this.prize}**!
                        drawing: "🎈 活動持續時間: {timestamp}",
                        dropMessage: "快點成為第一個對 Emojia 做出反應的人！",
                        embedFooter: "總共 {this.winnerCount} 位得獎者",
                        noWinner: "沒有人參與贈品活動，只好忍痛取消 🥲",
                        winners: "🏆 得獎者是:",
                        endedAt: "⏲️ 結束時間",
                        hostedBy: "🥷 主辦: {this.hostedBy}",
                    },
                    pauseOptions: {
                        isPaused: true,
                        content: '⚠️ **此贈品已經暫停 !** ⚠️', // THIS GIVEAWAY IS PAUSED !
                        unPauseAfter: null,
                        embedColor: '#FFDD80',
                        infiniteDurationText: '`NEVER`'
                    }
                }).then(async () => {
                    successEmbed.setDescription("贈品活動已經成功開始") // Giveaway was successfully started.
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    });
                }).catch((err) => {
                    errorEmbed.setDescription(`發生了錯誤\n\`${err}\``) // An error has occurred
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                })


            }
            break;

        case "指令": {
            const choice = options.getString("選項");
            const messageId = options.getString("訊息_id");
            const giveaway =
                // Search with messageId
                client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            // If no giveaway was found
            if (!giveaway) {
                errorEmbed.setDescription(`無法再伺服器找到此 ID : ${messageId}`); // Unable to find the giveaway with the message id : ${messageId} in the guild.
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }
            switch (choice) {
                case "結束": {
                    client.giveawaysManager.end(messageId).then(() => {
                        successEmbed.setDescription("贈品活動已經結束"); // Giveaway has been ended.
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        })
                    }).catch((err) => {
                        errorEmbed.setDescription(`發生了錯誤\n\`${err}\``) // An error has occurred
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        });
                    });
                }
                break;

            case "暫停": {
                client.giveawaysManager.pause(messageId).then(() => {
                    successEmbed.setDescription("贈品活動已經暫停");
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    })
                }).catch((err) => {
                    errorEmbed.setDescription(`發生了錯誤\n\`${err}\``)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                });
            }
            break;

            case "取消暫停": {
                client.giveawaysManager.unpause(messageId).then(() => {
                    successEmbed.setDescription("贈品活動已經取消暫停");
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    })
                }).catch((err) => {
                    errorEmbed.setDescription(`發生了錯誤\n\`${err}\``)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                });
            }
            break;

            case "重新抽獎": {
                client.giveawaysManager.reroll(messageId).then(() => {
                    successEmbed.setDescription("贈品活動已經重新抽獎");
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    })
                }).catch((err) => {
                    errorEmbed.setDescription(`發生了錯誤\n\`${err}\``)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                });
            }
            break;

            case "刪除": {
                client.giveawaysManager.delete(messageId).then(() => {
                    successEmbed.setDescription("贈品活動已經刪除");
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    })
                }).catch((err) => {
                    errorEmbed.setDescription(`發生了錯誤\n\`${err}\``)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                });
            }
            break;
            }
        }
        break;

        default: {
            console.log("贈品指令出現錯誤") // Error in giveaway command.
        }
        }
    }
}