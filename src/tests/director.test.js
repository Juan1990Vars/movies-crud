const request = require('supertest');
const app = require('../app');
require('../models')



test('GET /directors', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
});

test('POST /directors', async () => {
    const director = {
        firstName: "Apolo",
        lastName: "Pastrana",
        nationality: "México",
        image: "http://apolo-pastrana.png",
        birthday: "1983-12-10"
    }
    const res = await request(app).post('/directors').send(director)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName)
});

test('PUT /directors/:id', async ()=> {
    const director = {
        lastName: "Apolo Tonatiuh",
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(director.lastName)
});

test('DELETE /directors/:id', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})