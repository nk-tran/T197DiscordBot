const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('see_due_dates')
        .setDescription('See upcoming due dates'),
    async execute(interaction) {
        // File path:
        const path = './records/test.txt';

        // Read the file contents asynchronously
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }

            // Process the file contents (in this case, simply logging them)
            console.log('File Contents:');
            console.log(data);
            interaction.reply(data);
            // You can parse and work with the file contents here
            // For example, you can split the content into lines using data.split('\n')
        });
    }
}