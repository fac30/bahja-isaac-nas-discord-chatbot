const { client } = require('../src/bot');  

describe('Discord Bot Tests', () => {
  test('should have a valid Discord.js client instance', () => {
    expect(client instanceof require('discord.js').Client).ok;
  });

  test('should emit the "ready" event', (done) => {
    // Assuming your bot emits the "ready" event when it's ready
    client.once('ready', () => {
      expect(true).toBeTruthy();
      // assert.ok(true);  
      done();
    });
  });

  test('should return teh correct client keys', () => {
    const actual = Object.keys(client);
    const expected =  [ "_events", "_eventsCount", "_maxListeners", "options", "rest", "ws", "actions", "voice", "shard", "users", "guilds", "channels", "sweepers", "presence", "user",   "application", "readyTimestamp"];
    expect(actual).toMatchObject(expected);
  });
});
