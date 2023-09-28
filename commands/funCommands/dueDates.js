const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('text')
        .setDescription('Fetches text file'),
    async execute(interaction) {
        fetch('https://pastebin.com/raw/m0wxYchg')
            .then(res => res.text())
            .then(text => {
                interaction.reply(text);
            })
            .catch(err => {
                console.error(err);
                interaction.reply('Error fetching text');
            });
    }
}