const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admintest')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        if (interaction.member.permissionsIn(interaction.channel).bitfield == 114349209288703n) {
            await interaction.reply(`You have administrator permissions`);
        } else {
            await interaction.reply(`Sorry, you do not have administrator permissions`);
        }

    } 
}