module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content === 'ping') {
            await message.reply('Pong!');
        }
    }
}