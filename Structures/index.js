const {
    Client,
    Collection,
} = require("discord.js");
const client = new Client({
    intents: 32767
});
const {
    Token
} = require("./config.json");
const {
    promisify
} = require("util");
const {
    glob
} = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();

const {
    DisTube
} = require("distube");
const {
    SpotifyPlugin
} = require("@distube/spotify");

client.distube = new DisTube(client, {
    // https://distube.js.org/#/docs/DisTube/stable/typedef/DisTubeOptions
    emitNewSongOnly: true,
    leaveOnFinish: true, // 播放結束自動離開頻道
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()],
    youtubeDL: false,
});
module.exports = client;

require("../Systems/GiveawaySys")(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);