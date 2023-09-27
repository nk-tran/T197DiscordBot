// For navigating the filesystem / seperation of commands
const filesystem = require("node:fs");
const path = require("node:path");

const { Client, GatewayIntentBits, Collection  } = require('discord.js');
require('dotenv').config();

// Instantiates client               GUILDS ARE DISCORD SERVERS
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// creates a collection that will store all the commands
client.commands = new Collection();

// sets path to COMMANDS FOLDER
const foldersPath = path.join(__dirname, 'commands');
// adds the folders inside folders path (commands) into an array
const commandFolders = filesystem.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // sets path to COMMANDS
    const commandsPath = path.join(foldersPath, folder);
    // adds commands to an array
    const commandFiles = filesystem.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath)
        
        // sets a new item in the collection with the key
        // as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
            for (command in client.commands) {
                console.log(command)
            }
        } else {
            console.log(`[[WARNING]] --- the command at ${filePath} is missing 
            the required DATA or EXECUTE property that qualifies it as a command`);
        }
    }
}


// Event Listener 
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // this returns true if the command matches one in the file system
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`no command matching ${interaction.commandName} exists`);
        return
    }

    try {
        await command.execute(interaction); 
    }  catch  (err) { console.log(error) }

    const errorResponse = {content: `There was an error while executing this command`,
                            ephemeral: true };

    if (!interaction.replied || interaction.deferred) {
        await interaction.followUp(errorResponse);
    } else {
        await interaction.reply(errorResponse);
    }

    // if (interaction.commandName === 'ping') {
    //     await interaction.reply('Returning ping interaction from commands..');
    // }

    // if (interaction.commandName === 'hi_function') {
    //     function sayHi() {
    //         // interaction.reply(`Hi, ${interaction.user.username}`);
    //         interaction.reply(`Hi, ${interaction.member.nickname}`);
    //         console.log(interaction);
    //     }
    //     sayHi();
    // }

    // if (interaction.commandName === 'flip_coin') {
    //     function flip() {
    //         let val = Math.floor(Math.random()*2)
    //         let result;
    //         if(val === 0)
    //             result = 'Heads'
    //         else
    //             result = 'Tails'
    //         interaction.reply(result);
    //     }
    //     flip();
    // }
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

// initialize server
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    for (command in client.commands) {
        console.log(command)
    }
});


client.login(process.env.TOKEN);