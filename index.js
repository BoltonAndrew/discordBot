require("dotenv").config();
// const express = require("express");
const { Client, Intents } = require("discord.js");
// const app = express();
// const port = process.env.PORT || 5000;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ["MESSAGE", "REACTION", "CHANNEL", "USER"],
});

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("messageCreate", (msg) => {
  let bool = false;
  msg.mentions.roles.map((role) => {
    if (!bool) {
      if (
        role.name === "Innovation Developer" ||
        role.name === "Software Instructor"
      ) {
        msg.reply({
          content:
            "Please answer the following questions to help us identify a solution: \n What topic/project/challenge I need help with? \n What I expect my code to do? \n What is actually happening? \n What I've tried to do to fix it? \n My GitHbub repo link:",
        });
        bool = true;
      }
    }
  });
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) {
    await reaction.message.fetch();
  }
  if (reaction.partial) {
    await reaction.fetch();
  }
  if (
    reaction.message.content.includes(
      "Before you can proceed to lectures and your desk allocations"
    )
  ) {
    if (reaction.emoji.name === "👍") {
      let guildId = reaction.message.guildId;
      let guildObj = client.guilds.cache.find((guild) => guild.id === guildId);
      let roleId = guildObj.roles.cache.find(
        (role) => role.name === "Junior Developer"
      ).id;
      reaction.message.guild.members.cache.get(user.id).roles.add(roleId);
    }
  }
});

client.login(process.env.TOKEN);

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
