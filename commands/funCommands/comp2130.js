const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2130')
        .setDescription('Information about COMP2130.'),
    async execute(interaction) {
        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130990/viewContent/7523940/View\n" +
                                "```" + `Professor: Mohammad Kiani\n` + 
                                `Professor Contact: Mohammad.Kiani@georgebrown.ca\n` +
                                `Class Times: Tuesday 6:00PM - 10:00PM\n` + 
                                `Upcoming Due Dates: \n` + "```");
    } 
}