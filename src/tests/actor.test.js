const request = require('supertest');
const app = require('../app');
require('../models')

let id;
test('GET /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
});

test('POST /actors', async () => {
    const actor = {
        firstName: "Juan",
        lastName: "Huerta",
        nationality: "México",
        image: "http://juan-vars.png",
        birthday: "1990-09-21"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName)
});


test('PUT /actors/:debe actualizar', async ()=> {
    const actor = {
        lastName: "Huerta Vargas",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(actor.lastName)
});

test('DELETE /actors/:id elimina', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});