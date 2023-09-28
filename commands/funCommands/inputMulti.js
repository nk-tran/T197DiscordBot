const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('input_due_dates')
        .setDescription('Submit new due date')
        .addStringOption(option =>
            option.setName('course_name')
                .setDescription('Enter course name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('assignment_type')
                .setDescription('Enter type of assignment (e.g., Lab/Assignment/Test)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('due_date')
                .setDescription('Enter due date (e.g., YYYY-MM-DD)')
                .setRequired(true)),
    async execute(interaction) {
        const courseName = interaction.options.getString('course_name');
        const courseType = interaction.options.getString('assignment_type');
        const dueDate = interaction.options.getString('due_date');
        console.log(`User entered Text 1: ${courseName}`);
        console.log(`User entered Text 2: ${courseType}`);
        console.log(`User entered Text 2: ${dueDate}`);
        //To add write/read feature to dates.txt

        await interaction.reply(`The due date for ${courseName}:${courseType} is ${dueDate}`);
    }
}