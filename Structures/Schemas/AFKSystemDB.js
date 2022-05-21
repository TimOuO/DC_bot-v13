const {
    model,
    Schema
} = require("mongoose");

module.exports = model("AFKDB", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
}));