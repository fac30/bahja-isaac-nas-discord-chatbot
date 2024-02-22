const { describe, it } = require('node:test');
const assert = require('assert');
const { client } = require('../src/bot');  

// describe('Discord Bot Tests', () => {
//   it('should have a valid Discord.js client instance', () => {
//     assert.ok(client instanceof require('discord.js').Client);
//   });

//   it('should emit the "ready" event', (done) => {
//     // Assuming your bot emits the "ready" event when it's ready
//     client.once('ready', () => {
//       assert.ok(true);  
//       done();
//     });
//   });

//   it('should have the correct intents enabled', () => {
//     const actual = client;
//     const expected = ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'];
//     assert.ok(actual, expected);
//   });
// });
