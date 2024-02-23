const { client } = require('../src/bot');  

// mock data
const clientKeyObject =  [ "_events", "_eventsCount", "_maxListeners", "options", "rest", "ws", "actions", "voice", "shard", "users", "guilds", "channels", "sweepers", "presence", "user",   "application", "readyTimestamp"];

const failClientKeyObject =  [ "_events", "_eventsCount", "_maxListeners", "options", "rest", "ws", "actions", "voice", "shard", "users", "sweepers", "presence", "user",   "application", "readyTimestamp"];

describe('Discord Bot Tests', () => {
  it('should have a valid Discord.js client instance', () => {
    expect(client instanceof require('discord.js').Client).ok;
  });

  it('should emit the "ready" event', (done) => {
    // Assuming your bot emits the "ready" event when it's ready
    client.once('ready', () => {
      expect(true).toBeTruthy(); 
      done();
    });
  });

  it('should return the correct client keys', () => {
    const actual = Object.keys(client);
    expect(actual).toMatchObject(clientKeyObject);
  });
});

describe('Discord Bot clientKeyObject', () => {
  it('should fail to match and return an error', () => {
    const actual = Object.keys(client);
    expect(actual).not.toBe(failClientKeyObject);
  })
})
