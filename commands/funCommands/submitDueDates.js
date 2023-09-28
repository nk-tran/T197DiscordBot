const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit_due_dates')
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

        // Inside the execute function, after getting the inputs
        const dueDateEntry = `${courseName}:${courseType} due on ${dueDate}\n`;

        const path = './records/test.txt';
        // Write the due date entry to a text file
        fs.appendFile(path, dueDateEntry, (err) => {
            if (err) {
                console.error('Error writing due date to file:', err);
            } else {
                console.log('Due date written to file successfully.');
            }
        });

        await interaction.reply(`Thanks for updating. Coursename:${courseName}, Type:${courseType}, Due: ${dueDate}`);
    }
}