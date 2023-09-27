const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fileSys = require('node:fs');
const path = require('node:path');

const commands = [];

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fileSys.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fileSys.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Grab the SlashCommandBuilder#ToJSON() output of each commands data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[[WARNING]] --- The command at ${filePath} is mising a required "data" or "execute" property `);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`);

        // the put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands`);
    } catch (error) {
        console.log(error);
    }
})();