const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;
test('GET /movies trae las peliculas', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
});

test('POST /movies crea una pelicula', async () => {
    const movie = {
        name: "Rapidos y Furiosos 9",
        image: "http://rapidos.png",
        synopsis: "Dom Toretto lleva una vida tranquila, pero sabe que el peligro siempre acecha. Esta vez, Dom y el equipo se reúnen para impedir un complot a escala mundial, liderado por uno de los asesinos más peligrosos y hábiles al volante a los que se han enfrentado; un hombre que además es el hermano desaparecido de Dom, Jako.",
        releaseYear: 2021
    }
    const res = await request(app).post('/movies').send(movie)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name)
});

test('PUT /movies/:id actualiza una pelicula', async ()=> {
    const movie = {
        name: "la monja 2",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name)
});

test('POST /movies/:id/actors insertar los actores de la pelicula', async ()=> {
    const actor = await Actor.create({
        firstName: "no se que poner",
        lastName: "jejeje",
        nationality: "mexicano",
        image: "http://jejejej.png",
        birthday: "1980-05-24"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
    
});

test('POST /movies/:id/directors se inserta a los directores de la pelicula', async() => {
    const director = await Director.create({
        firstName: "hola",
        lastName: "mundo",
        nationality: "nikelodeon",
        image: "http://mmmmm.png",
        birthday: "1966-07-11"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/genres se inserta los generos de la pelicula', async() => {
    const genre = await Genre.create({
        name: "Aventura"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
})

test('DELETE /movies/:id se elimina una pelicula', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});