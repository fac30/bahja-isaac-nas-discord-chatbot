const { handleMessage } = require('../src/messageHandler.js');

describe('MessageHandler', () => {
    it('should ignore messages from bots', async () => {
        const mockClient = {
            user: { id: 'mocked_bot_id' },
        };

        const mockMessage = {
            author: { bot: true },
            content: 'Hello, bot!',
            channel: { reply: jest.fn() }, 
        };

        const replySpy = jest.spyOn(mockMessage.channel, 'reply');
        await handleMessage(mockClient, mockMessage);
        expect(replySpy).not.toHaveBeenCalled();
    });

    it('should ignore messages with ignore prefix', async () => {
        const mockClient = {
            user: { id: 'mocked_bot_id' },
        };

        const mockMessage = {
            author: { bot: false },
            content: '!ignore This message should be ignored.',
            channel: { reply: jest.fn() }, 
        };

        const replySpy = jest.spyOn(mockMessage.channel, 'reply');
        await handleMessage(mockClient, mockMessage);
        expect(replySpy).not.toHaveBeenCalled();
    });

    it('should ignore messages from other bots', async () => {
        const mockClient = {
            user: { id: 'mocked_bot_id' },
        };
    
        const mockMessage = {
            author: { bot: true },
            content: 'Hello, bot!',
            channelId: ["1204934204450676859", "1205948661310292040"],
            mentions: { users: new Map().set('mocked_bot_id', {}) },
            channel: {
                id: ["1204934204450676859", "1205948661310292040"],
                sendTyping: jest.fn().mockResolvedValue(null),
                messages: {
                fetch: jest.fn().mockResolvedValue({
                    array: jest.fn(() => []),
                }),
                },
            },
            reply: jest.fn(),
        };
    
        await handleMessage(mockClient, mockMessage);
        expect(mockMessage.reply).not.toHaveBeenCalled();
    });
  
    it('should ignore messages with the ignore prefix', async () => {
        const mockClient = {
            user: { id: 'mocked_bot_id' },
        };
    
        const mockMessage = {
            author: { bot: false },
            content: '!ignore This message should be ignored.',
            channelId: ["1204934204450676859", "1205948661310292040"],
            mentions: { users: new Map().set('mocked_bot_id', {}) },
            channel: {
                id: ["1204934204450676859", "1205948661310292040"],
                sendTyping: jest.fn().mockResolvedValue(null),
                messages: {
                fetch: jest.fn().mockResolvedValue({
                    array: jest.fn(() => []),
                }),
                },
            },
            reply: jest.fn(),
            };
        
            await handleMessage(mockClient, mockMessage);
            expect(mockMessage.reply).not.toHaveBeenCalled();
    });
    
});