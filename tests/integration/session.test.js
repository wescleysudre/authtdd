const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })


    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentiasl', async () => {
    const user = await factory.create('User', {
      password: '1234567'
    })


    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })


    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.body).toHaveProperty('token');
  })

  it('should be able to acces private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  })

  it('should not be able to acces private routes when not authenticated', async () => {
    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(401);
  })

  it('should not be able to acces private routes with invalid token', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })


    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`)

    expect(response.status).toBe(401);
  })

});