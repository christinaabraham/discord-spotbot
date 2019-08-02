const commando = require("discord.js-commando");
const YTDL = require("ytdl-core");
const discord = require("discord.js");



class PlayCommand2 extends commando.Command {
  constructor(client) {
    super(client, {
      name: "play2",
      group: "music",
      memberName: "play2",
      description: "Plays a song"
    });
  }

  async run(client, message, args, ops) {
    let validated = await YTDL.validateURL(args[0]);
    let info = await YTDL.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(YTDL(args[0], {filter: "audioonly"}));  // or play

    if(!message.member.voiceChannel) message.channel.send("Please connect to a voice channel first.");
    if(!args[0]) message.channel.send("Please enter a URL following the command.");
    if(!validated) message.channel.send("You must enter a **valid** URL following the command.");

    message.channel.send(`Now playing: ${info.title}`);


  }

}
  module.exports = PlayCommand2;
