const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2130')
        .setDescription('Information about COMP2130.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let javaLines =[];

        // Read the contents of the test file.
        const readTests = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(testPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // Read the contents of the assignment file.
        const readAssignments = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(assignmentPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // Read the contents of the labs file.
        const readLabs = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(labPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // Splitting lines by specific class.
        const splitLines = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(assignmentPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');

                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes('Java')) {
                                javaLines.push('\n' + lines[i]);
                                resolve(javaLines);
                            }
                        }

                    }
                });
            });
        }

        // Reads all three files.
        
            const [testData, assignmentData, labData, lineTest] = await Promise.all([
                readTests(),
                readAssignments(),
                readLabs(),
                splitLines(),
            ]);

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130990/viewContent/7523940/View\n" +
                                "```" + `Professor: Mohammad Kiani\n` + 
                                `Professor Contact: Mohammad.Kiani@georgebrown.ca\n` +
                                `Class Times: Tuesday 6:00PM - 10:00PM\n` + 
                                `Upcoming Due Dates: ${lineTest}\n` + "```");

    } 
}