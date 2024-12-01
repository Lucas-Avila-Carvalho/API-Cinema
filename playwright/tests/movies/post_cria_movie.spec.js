import { test, expect } from '@playwright/test';

test.describe('POST /movies', () => {
  test('Deve criar um novo filme com sucesso', async ({ request }) => {
    const newMovie = {
      title: 'Filme de Sucesso',
      description: 'Um filme criado com sucesso',
      launchdate: '2024-12-01T00:00:00Z',
      showtimes: ['2024-12-01T15:00:00Z', '2024-12-01T20:00:00Z']
    };

    const response = await request.post(`/movies`, { data: newMovie });

    // Validar que o status é 201
    expect(response.status()).toBe(201);

    // Validar que o filme foi criado corretamente
    const createdMovie = await response.json();
    expect(createdMovie).toHaveProperty('_id');
    expect(createdMovie.title).toBe(newMovie.title);
    expect(createdMovie.description).toBe(newMovie.description);
  });

  test('Não deve criar um filme com título vazio', async ({ request }) => {
    const invalidMovie = {
      title: '', // Título inválido
      description: 'Descrição válida',
      launchdate: '2024-12-01T00:00:00Z',
      showtimes: ['2024-12-01T15:00:00Z']
    };

    const response = await request.post(`/movies`, { data: invalidMovie });

    // Validar que o status é 400 (dados inválidos)
    expect(response.status()).toBe(400);

    // Validar a mensagem de erro
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
    expect(errorResponse.error).toContain('Título é obrigatório'); // Supondo mensagem de erro
  });

  test('Não deve criar um filme com data de lançamento inválida', async ({ request }) => {
    const invalidMovie = {
      title: 'Filme com Data Inválida',
      description: 'Descrição válida',
      launchdate: 'data-invalida', // Data inválida
      showtimes: ['2024-12-01T15:00:00Z']
    };

    const response = await request.post(`/movies`, { data: invalidMovie });

    // Validar que o status é 400 (dados inválidos)
    expect(response.status()).toBe(400);

    // Validar a mensagem de erro
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
    expect(errorResponse.error).toContain('Data de lançamento inválida'); // Supondo mensagem de erro
  });
});
