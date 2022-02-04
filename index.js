require("dotenv").config();
const express = require("express");
const { Client, Intents } = require("discord.js");
const app = express();
const port = process.env.PORT || 5000;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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

client.login(process.env.TOKEN);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
