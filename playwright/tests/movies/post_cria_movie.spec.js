const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('POST /movies', () => {
  test('Deve criar um novo filme e armazenar o ID em um arquivo', async ({ request }) => {
    // Dados para criar um novo filme
    const newMovie = {
      title: 'Novo Filme',
      description: 'Descrição do Novo Filme',
      launchdate: '2024-12-01T00:00:00Z',
      showtimes: ['2024-12-01T15:00:00Z', '2024-12-01T20:00:00Z']
    };

    // Enviar requisição POST para criar o filme
    const response = await request.post(`/movies`, {
      data: newMovie
    });

    // Validar o status da resposta
    expect(response.status()).toBe(201);

    // Validar que o filme foi criado corretamente
    const createdMovie = await response.json();
    expect(createdMovie).toHaveProperty('_id');
    expect(createdMovie.title).toBe(newMovie.title);
    expect(createdMovie.description).toBe(newMovie.description);

    // Armazenar o ID em um arquivo JSON
    const movieId = createdMovie._id;
    fs.writeFileSync('createdMovieId.json', JSON.stringify({ id: movieId }, null, 2));
    console.log(`ID do filme criado armazenado: ${movieId}`);
  });
});
