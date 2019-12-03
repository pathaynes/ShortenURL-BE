require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
describe('meme routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a custom url', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'password' });
    return agent
      .post('/api/v1/urls')
      .send({ 
        customUrl: 'test-url',
        longUrl: 'https://www.test.com/'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          customUrl: 'test-url',
          longUrl: 'https://www.test.com/',
          hits: 0,
          user: expect.any(String),
          __v: 0
        });
      });
  });
});
