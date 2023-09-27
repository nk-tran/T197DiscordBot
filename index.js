const { Client, GatewayIntentBits  } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Returning ping interaction from commands..');
    }

    if (interaction.commandName === 'hi_function') {
        function sayHi() {
            // interaction.reply(`Hi, ${interaction.user.username}`);
            interaction.reply(`Hi, ${interaction.member.nickname}`);
            console.log(interaction);
        }
        sayHi();
    }

    if (interaction.commandName === 'flip_coin') {
        function flip() {
            let val = Math.floor(Math.random()*2)
            let result;
            if(val === 0)
                result = 'Heads'
            else
                result = 'Tails'
            interaction.reply(result);
        }
        flip();
    }
});

client.on('typingStart', async (interaction) => {
    console.log('Started typing');
});
client.on('typingStop', async (interaction) => {
    console.log('Stopped typing');
});
client.on('messageCreate', async (message) => {
    if (message.content === 'ping') {
        await message.reply('Pong!');
    }
});

client.login(process.env.TOKEN);