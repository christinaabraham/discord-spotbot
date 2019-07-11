const commando = require("discord.js-commando");
const YTDL = require("ytdl-core");

function play(connection, message) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(server.queue[0, {filter: "audioonly"}]));
  server.queue.shift();
  server.dispatcher.on("end", function() {
    if(server.queue[0]) {
      play(connection, message);
    } else {
      connection.disconnect();
    }
  });
}

class JoinChannelCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: "join",
      group: "music",
      memberName: "join",
      description: "Joins the voice channel of the commander"
    });
  }

  async run(message, args) {
    if(message.member.voiceChannel && !message.guild.voiceConnection) {
      if(!servers[message.guild.id]) {
        servers[message.guild.id] = {queue: []};
      }
      message.member.voiceChannel.join()
        .then(connection => {
          var server = servers[message.guild.id];
          message.reply("Successfully joined!");
          server.queue.push(args);
          play(connection, message);
        });

    } else {
      message.reply("You must be in a voice channel first.");
    }
  }
}

module.exports = JoinChannelCommand;
