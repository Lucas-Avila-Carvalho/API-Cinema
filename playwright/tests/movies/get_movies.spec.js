const { test, expect } = require('@playwright/test');

  test('Deve retornar uma lista de filmes com status 200', async ({ request }) => {
    const response = await request.get(`/movies`);
    expect(response.status()).toBe(200);
    const movies = await response.json();
    expect(Array.isArray(movies)).toBe(true);
  })

  test('Deve validar que todos os filmes retornados possuem os campos esperados', async ({ request }) => {
    const response = await request.get(`/movies`);
    expect(response.status()).toBe(200);
    const movies = await response.json();
    movies.forEach(movie => {
      expect(movie).toHaveProperty('title');
      expect(movie).toHaveProperty('description');
      expect(movie).toHaveProperty('launchdate');
      expect(movie).toHaveProperty('showtimes');
      expect(movie).toHaveProperty('_id');
    });
  });
  test('Deve validar que os campos retornados têm os tipos esperados', async ({ request }) => {
    const response = await request.get(`/movies`);
    expect(response.status()).toBe(200);
    const movies = await response.json();
    movies.forEach(movie => {
        expect(typeof movie.title).toBe('string');
        expect(typeof movie.description).toBe('string');
        expect(new Date(movie.launchdate).toString()).not.toBe('Invalid Date');

        // Aceitar array ou string para showtimes
        const isValidShowtimes = Array.isArray(movie.showtimes) || typeof movie.showtimes === 'string';
        expect(isValidShowtimes).toBe(true);

        expect(typeof movie._id).toBe('string');
    });
});

  /*BUG REPORTADO
  test('Deve validar que todos os títulos são únicos', async ({ request }) => {
    const response = await request.get(`/movies`);
    expect(response.status()).toBe(200);
    const movies = await response.json();
    const titles = movies.map(movie => movie.title);
    const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);

    console.error('Títulos duplicados encontrados:', duplicates);

    // Valide se não há duplicatas
    expect(duplicates.length).toBe(0); // Teste falha com duplicatas
});*/
test('Deve validar que todos os IDs são únicos', async ({ request }) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  const ids = movies.map(movie => movie._id);
  const uniqueIds = new Set(ids);

  expect(uniqueIds.size).toBe(ids.length); // IDs devem ser únicos
});

test('Deve retornar status 404 ao buscar um filme com ID inexistente', async ({ request }) => {
  const invalidId = '1234567890abcdef';
  const response = await request.get(`/movies/${invalidId}`);
  expect(response.status()).toBe(404);
  const errorMessage = await response.json();
  expect(errorMessage.message).toBe('Movie not found');
});
test('Deve validar que nenhuma data de lançamento está no futuro', async ({ request }) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  movies.forEach(movie => {
    const launchDate = new Date(movie.launchdate);
    expect(launchDate.getTime()).toBeLessThanOrEqual(new Date().getTime());
  });
});
test.describe('GET /movies/:id', () => {
  test('Deve retornar 200 ao enviar um ID válido', async ({ request }) => {
    // Suponha que você já tenha um ID válido conhecido
    const validId = 'DWihJdZ1olcjZ7FO'; // Substitua por um ID válido retornado pela API

    // Enviar requisição GET com o ID válido
    const response = await request.get(`/movies/${validId}`);
    
    // Validar o status da resposta
    expect(response.status()).toBe(200);

    // Validar que os dados retornados correspondem ao esperado
    const movie = await response.json();
    expect(movie).toHaveProperty('_id', validId);
  });
});