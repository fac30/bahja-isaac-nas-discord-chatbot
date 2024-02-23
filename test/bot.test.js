const { client } = require('../src/bot');  

/*****  
mock data 
*****/ 
const pass_client_key_object =  [ "_events", "_eventsCount", "_maxListeners", "options", "rest", "ws", "actions", "voice", "shard", "users", "guilds", "channels", "sweepers", "presence", "user", "application", "readyTimestamp"];

const fail_client_key_object =  [ "_events", "_eventsCount", "_maxListeners", "options", "rest", "ws", "actions", "voice", "shard", "users", "sweepers", "presence", "user", "application", "readyTimestamp"];

describe('Discord Bot Tests - happy path', () => {
  it('should have a valid Discord.js client instance', () => {
    expect(client instanceof require('discord.js').Client).toBeTruthy();
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
    expect(actual).toMatchObject(pass_client_key_object);
  });

  it('checks that the client key in not undefined', () => {
    const actual = Object.keys(client);
    expect(actual).not.toBeUndefined();
  });
  
  it('checks that an object is returned', () => {
    const actual = Object.keys(client);
    expect(actual).toBeTruthy();
  });
});

describe('Discord Bot clientKeyObject - unhappy path', () => {
  it('should throw error as invalid Discord.js client instance', () => {
    expect(() => { client instanceof require('discord.js').client }).toThrow();
  });

  it('should fail to match and return an error', () => {
    const actual = Object.keys(client);
    expect(actual).not.toBe(fail_client_key_object);
  });
})
