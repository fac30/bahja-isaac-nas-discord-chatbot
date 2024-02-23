const dotenv = require('dotenv/config');


describe('dotenv Configuration', () => {
  it('should successfully configure dotenv', () => {
    expect('dotenv/config'.error).toBeUndefined();
  });
});

describe('Bot Token', () => {
  it('should have a valid bot token', () => {
    expect(process.env.TOKEN).toBeDefined();
  });
});




