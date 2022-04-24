const {
    MessageEmbed,
    Message
} = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * @
     * @param {Message} message
     */
    execute(message) {
        if (message.author.bot) {
            return
        } else if (message.content.includes("嗨") ||
            message.content.includes("哈囉") ||
            message.content.toLowerCase().includes("hi") ||
            message.content.toLowerCase().includes("hello")) {
            message.channel.send(`${message.author} 哈囉 😊 可以使用 / 指令呦~`);
            message.react("🙌");
        } else if (message.content.includes("跟你說喔")) {
            message.channel.send(`說甚麼呢 🤔`)
                .then(message.channel.send(`${message.author}很可愛呢 💜`));
            message.react('❤️');
        } else if (message.content.includes("可愛")) {
            message.channel.send(`誰可愛呀 🤔`)
                .then(message.channel.send(`${message.author}可愛呢 ❤️`));
            message.react('💜');
            message.react("❤️");
            message.react("🧡");
            message.react("💛");
            message.react("💚");
            message.react("💙");
            message.react("💗");
        } else if (message.content == ("喔") ||
            message.content == ("是喔")) {
            message.channel.send(`${message.author}為什麼句點我 👉🥺👈`)
                .then(message.channel.send("https://cdn.discordapp.com/attachments/967328542847275051/967328558701764618/unknown.png"));
            message.react("🐽");
        } else if (message.content.includes("哼")) {
            message.channel.send(`${message.author}怎麼了呀`)
                .then(message.channel.send(`誰欺負妳我幫妳揍他 😤`));
        } else if (message.content.includes("被你氣死")) {
            message.channel.send(`${message.author}是小仙女、小可愛`)
                .then(message.channel.send(`最好了對不對`)).then(message.channel.send(`對呢 ❤️`));
        } else if (message.content.includes("滾")) {
            message.channel.send(`滾到妳的旁邊嘛?`)
                .then(message.channel.send(`沒問題呢😊`))
                .then(message.channel.send("滾地球一圈🌏🌍🌎🌏 我又回來了~"));
        } else if (message.content.includes("臭胖")) {
            message.channel.send(`講錯囉~ 是香胖歐 😊`);
        } else if (message.content.includes("蛤")) {
            message.channel.send(`蛤蜊是對可食用的雙殼綱貝類的泛稱~ \n 煮湯好喝 😋`);
        } else if (message.content.includes("死胖子") ||
            message.content.includes("揍你")) {
            message.channel.send(`${message.author}怎麼忍心 🥺 \n 看在我幫妳按熊貓的份上`);
            message.react("🐼");
        } else if (message.content.includes("憨")) {
            message.channel.send(`肯定不是我呢 😀 \n 但想幫妳按一個流口水`);
            message.react("🤤");
        } else if (message.content.includes("掰") ||
            message.content.includes("拜")) {
            message.channel.send(`豈是你說掰就掰呀 \n 回來喔 눈▂눈`);
            setTimeout(message.channel.send(`好吧 👋 晚點見囉 ❤️`), 2000);
        } else if (message.content.includes("靠")) {
            message.channel.send(`Cow 是牛喔~`);
            message.react("🐄");
            message.react("🦬");
            message.react("🐂");
            message.react("🐃");
        } else if (message.content == ("胖胖") ||
            message.content == ("呼呼") ||
            message.content == ("胖子")) {
            message.channel.send(`怎麼了呀阿肥肥 😀`);
        } else if (message.content.includes("變態") ||
            message.content.includes("欠打")) {
            message.channel.send(`誰!? Who!? 蝦郎!? 😮 \n 肯定不是我 😉`);
        } else if (message.content.includes("不理你")) {
            message.channel.send(`不要不理我拉~ 阿肥肥 🥺`);
            message.react("🐷");
        } else if (message.content.includes("不理我")) {
            message.channel.send(`怎麼會不理你呢~ 阿肥肥 ❤️`);
            message.react('💜');
        } else if (message.content.includes("嘴邊肉")) {
            message.channel.send(`${message.author}的特好捏呢 😊`);
            message.react('🤏');
        } else if (message.content.includes("廁所") ||
            message.content.includes("洗澡") ||
            message.content.includes("🛀") ||
            message.content.includes("拉屎")) {
            message.channel.send(`好呢~ ${message.author}小心不要掉到馬桶喔~ 😉`);
        } else if (message.content.includes("~~") ||
            message.content.includes("～～")) {
            message.channel.send(`海帶呀海帶~ 海帶呀海帶~`);
        } else if (message.content.includes("鼻屎")) {
            message.channel.send(`這個 No No 喔`);
            message.react('❌');
        } else if (message.content.includes("🌚")) {
            message.channel.send(`${message.author}太陽曬很多喔 😏 \n 要記得擦防曬~ 👍`);
        } else if (message.content.includes("🌝")) {
            message.channel.send(`${message.author}很棒呢 😊 \n 有好好擦防曬~`);
        } else if (message.content.includes("晚上好")) {
            message.channel.send(`晚上好的呢~`);
        } else if (message.content.includes("早上好")) {
            message.channel.send(`早上好的🦆`);
        } else if (message.content.includes("嗚嗚")) {
            message.channel.send(`🚂 嗚~嗚~ 寢強寢強~`);
        } else if (message.content.includes("等一下")) {
            message.channel.send(`等兩下`);
        } else if (message.content.includes("人渣") ||
            message.content.includes("敗類") ||
            message.content.includes("垃圾")) {
            message.channel.send(`皮諾可，這個直接電死 😡`)
                .then(message.channel.send("https://cdn.discordapp.com/attachments/960812835837976576/967326967449931856/unknown.png"));
        } else if (message.content.includes("吃東西") ||
            message.content.includes("吃飯")) {
            message.channel.send(`${message.author} 看看你的肚肚 😀 \n 小心不要變這樣呦~`)
                .then(message.channel.send("https://cdn.discordapp.com/attachments/967328542847275051/967329507646251088/unknown.png"));
        } else if (message.content.toLowerCase().includes("mua") ||
            message.content.toLowerCase().includes("kiss") ||
            message.content.includes("親")) {
            message.channel.send("https://c.tenor.com/FgYExssph6MAAAAC/kiss-love.gif")
                .then(message.channel.send("https://c.tenor.com/ufd0ItHQVaIAAAAC/mochi-mochimochi.gif"));
        } else if (message.content.includes("偷看")) {
            message.channel.send("謀揪~ 我也要偷看呢 😶‍🌫️");
        } else if (message.content.includes("不要笑")) {
            message.channel.send("噗 (裝沒事").then(message.channel.send("可是會不小心忍不住 😺"));
            message.react('😺');
        }

        if (message.content == "小遊戲") {
            const littleGame = new MessageEmbed()
                .setColor("PURPLE")
                .setTitle("小遊戲指令")
                .setDescription("輸入以下小遊戲的指令~")
                .addFields({
                        name: `\u200B`,
                        value: `\u200B`
                    }, {
                        name: "`亂數`",
                        value: "隨機獲得數字，去跟朋友比比大小吧~"
                    }, {
                        name: "`猜拳`",
                        value: "就是猜拳呢 😝"
                    },
                    // { name: "`$dislike`", value: 'Dislikes the current message'}
                )
            message.channel.send({
                embeds: [littleGame]
            })
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        if (message.content == "亂數") {
            message.react('✅');
            let randomNumber = getRandomNumber(0, 1000);
            message.reply(`你的數字是: ${randomNumber} 😝`)
        }

        function getMora(x) {
            return Math.floor(Math.random() * x);
        }

        if (message.content == "猜拳") {
            message.react('✅');
            let randomMora = getMora(3);
            // console.log(randomMora);
            if (randomMora == 0) {
                message.reply(`✌️`)
            } else if (randomMora == 1) {
                message.reply(`✊`)
            } else if (randomMora == 2) {
                message.reply(`🖐️`)
            }
        }

    }
}