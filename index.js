const Commando = require("discord.js-commando");
const discord = require("discord.js");
const bot = new Commando.Client();
const config = require("./botconfig.json")

bot.registry.registerGroup("music", "Music");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

// Sets the bot to function locally, not globally
global.currentTeamMembers = [];
global.servers = {};

bot.on("ready", async() => {
  console.log(`${bot.user.username} is now online!`);
  bot.user.setGame("coding! | ;help")
});

bot.on("message", async message => {
  // message.member.send intro & help
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let prefix = config.prefix;
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);

  if(cmd.toLowerCase() == `${prefix}hello`) {
    message.channel.send("Hello " + message.author + ", how are you?");
    // or message.reply() <-- mentions
  }
});

bot.login(config.token);
