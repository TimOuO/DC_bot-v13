const {
    Perms
} = require("../Validation/Permissions");
const {
    Client
} = require("discord.js");

/**
 * @param {Client} client 
 */
module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Command Loaded"); //命令加載事件

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing a name.") // 失敗 缺少名字

        if (!command.context && !command.description)
            return Table.addRow(command.name, "🔸 FAILED", "Missing a description.") //缺少說明

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "🔸 FAILED", "Invalid permission") //權限無效
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "🔹 SUCCESSFUL"); // 成功
    });

    console.log(Table.toString());

    // PERMISSIONS CHECK 權限檢查 //

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("960807141411790888");
        /**伺服器 ID
        胖胖: 960807141411790888
        烏干達: 327432272481615872
        */
        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                // return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed).first(10);
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {
                        id: r.id,
                        type: "ROLE",
                        permission: true
                    }]
                }, []);

                return [...accumulator, {
                    id: r.id,
                    permissions
                }]
            }, []);

            await MainGuild.commands.permissions.set({
                fullPermissions
            });
        });
    });
}