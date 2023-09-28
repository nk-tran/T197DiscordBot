const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admintest')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        //                  This bitfield number: 114349209288703n equates to Admin permission
        // if user has admin bitfield in the channel the command was called from, reply with admin 
        // function, otherwise, tell them to get lost
        if (interaction.member.permissionsIn(interaction.channel).bitfield == 114349209288703n) {
            await interaction.reply(`You have administrator permissions`);
        } else {
            await interaction.reply(`Sorry, you do not have administrator permissions`);
        }

    } 
}