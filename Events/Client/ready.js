const {
    Client
} = require("discord.js")
const mongoose = require("mongoose");
const {
    Database
} = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`${client.user.tag} Login!`);

        client.user.setActivity("阿肥肥說❤️", {
            type: "LISTENING" // COMPETING, LISTENING, PLAYING, STREAMING, WATCHING
        })
        client.user.setPresence({
            status: "online" // online/invisible/idle/dnd
        })

        if (!Database) return;
        mongoose.connect(Database, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            console.log("連接到 MongoDB") // 連接到 MongoDB Connect to MongoDB.
        }).catch((err) => {
            console.log(err)
        });
    },
};