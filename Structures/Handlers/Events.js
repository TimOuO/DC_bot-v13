const {
    Events
} = require("../Validation/EventNames");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Events Loaded"); //已加載事件

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, "⛔ FAILED", `The Event name is invalid or missing: ${L[L.length - 2]}/${L[L.length - 1]}`); // Event 名稱無效或丟失 The Event name is invalid or missing:
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✅ SUCCESSFUL") //成功
    });

    console.log(Table.toString());
}