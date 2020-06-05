import TwitchJs, { ApiVersions, Message, Messages } from 'twitch-js';

const channel = 'antonosu';
const prefix = '!';
const admins = ['antonosu'];

export const connectBot = async (username: string, token: string) => {
  console.log(process.env.TWITCH_TOKEN);
  const { api, chat } = new TwitchJs({
    username,
    token,
  });

  chat.on(TwitchJs.Chat.Events.PRIVATE_MESSAGE, (message) => {
    // Disregard messages from ourselves.
    if (message.isSelf) return;

    // Disregard messages without command prefix.
    if (!message.message.startsWith(prefix)) return;

    const args = message.message.slice(prefix.length).split(/ +/);
    const command = args.shift()!.toLowerCase();

    switch (command) {
      case 'yo': {
        chat.say(message.channel, `hi ${message.username}!`);
        break;
      }
      case 'dab': {
        chat.say(message.channel, `${message.username}, pls dont dab.`);
        break;
      }
      default:
        break;
    }

    console.log(message.message);
  });

  try {
    await chat.connect();
    chat.join(channel);
  } catch (error) {
    console.error(error);
  }
};
