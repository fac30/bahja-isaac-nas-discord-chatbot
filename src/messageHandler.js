require('dotenv/config');
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const IGNORE_PREFIX = "!";
// the channel the bot to respond in
const CHANNELS = ["1204934204450676859", "1205948661310292040"];

async function handleMessage(client, message) {
  if (message.author.bot) return;
  if (message.content.startsWith(IGNORE_PREFIX)) return;
  // if message doesn't include channel ids and message doesnt inclue ping to bot then we will ignore the message.
  if (
    !CHANNELS.includes(message.channelId) &&
    !message.mentions.users.has(client.user.id)
  )
    return;

  // bot is typing
  await message.channel.sendTyping();
  // set interval
  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 3000);

  // fetch all past messages
  let conversation = [];
  conversation.push({
    role: "system",
    content: "Chat GPT is your bot friend.",
  });

  // will fetch last 10 messages from the channel
  let prevMessages = await message.channel.messages.fetch({ limit: 10 });

  // correct order
  prevMessages.reverse();
  
  // loop through each prev messages to push to the convo array
  prevMessages.forEach((msg) => {
    // if the msg auth was a bot and the id does not match our bot id then we'll ignore the msg.
    if (msg.author.bot && msg.author.id !== client.user.id) return;
    if (msg.content.startsWith(IGNORE_PREFIX)) return;

    // evaluate user name of person, remove spaces etc
    const username = msg.author.username
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/gi, "");

    // check msg author id
    if (msg.author.id === client.user.id) {
      conversation.push({
        role: "assistant",
        name: username,
        content: msg.content,
      });
      return;
    }

    // this will run if the conversation belongs to a user
    conversation.push({
      role: "user",
      name: "username",
      content: msg.content,
    });
  });

  // respond to messge by sending a request to openAI
  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    })
    .catch((error) => console.error("OpenAI Error:\n", error));

  clearInterval(sendTypingInterval);

  if (!response) {
    message.reply("Open AI not responding. Try again soon.");
    return;
  }

  // breakdown message character because of discord limit
  const respondeMessage = response.choices[0].message.content;
  const chunkSizeLimit = 2000;

  for (let i = 0; i < respondeMessage.length; i += chunkSizeLimit) {
    const chunk = respondeMessage.substring(i, i + chunkSizeLimit);
    await message.reply(chunk);
  }
}

module.exports = { handleMessage };
