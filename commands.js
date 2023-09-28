require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with index js..',
    },

    {
        name: 'hi_function',
        description: 'Say hi and prints interaction to console',
    },

    {
        name: 'flip_coin',
        description: 'Randomly returns head or tail',
    },

    {
      name: 'due_dates',
      description: 'Returns due dates for the current month',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands');

        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('Slash commands started');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();