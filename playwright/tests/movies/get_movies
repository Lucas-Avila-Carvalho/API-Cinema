const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000'; // Substitua pelo URL da sua API

test.describe('GET /movies', () => {
  
  test('Deve retornar uma lista de filmes com status 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/movies`);
    
    // Valida se o status da resposta é 200
    expect(response.status()).toBe(200);

    // Valida se a resposta contém um array
    const movies = await response.json();
    expect(Array.isArray(movies)).toBe(true);
  })})