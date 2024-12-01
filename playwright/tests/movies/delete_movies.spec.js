import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from '../../data/cria-filme';

test("Deve excluir um filme existente", async ({ request }) => {
  const movieId = await getRandomMovieIdAndStore(request); 
  const response = await request.delete(`/movies/${movieId}`);

  expect(response.status()).toBe(200);
});

test("Deve retornar erro 404 ao tentar excluir um filme inexistente", async ({ request }) => {
    const invalidMovieId = "ID_INVÁLIDO_123"; 
    const response = await request.delete(`/movies/${invalidMovieId}`);
    expect(response.status()).toBe(404); 
    const error = await response.json();
    expect(error.message).toBe("Movie not found");
  });

  test("Deve retornar erro 404 ao tentar excluir um filme com ID vazio", async ({ request }) => {
    const response = await request.delete(`/movies/ `);
    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error.message).toBe("Cannot DELETE /movies/");
  });

  test("Deve retornar erro 404 ao tentar excluir um filme que já foi excluído", async ({ request }) => {
    const movieId = await getRandomMovieIdAndStore(request);
    const deleteResponse = await request.delete(`/movies/${movieId}`);
    expect(deleteResponse.status()).toBe(200);
    const response = await request.delete(`/movies/${movieId}`);
    expect(response.status()).toBe(404); 
    const error = await response.json();
    expect(error.message).toBe("Movie not found");
  });

test("Deve retornar erro 400 ao tentar excluir filme com ID de tipo incorreto", async ({ request }) => {
  const invalidMovieId = 12345;

  const response = await request.delete(`/movies/${invalidMovieId}`);

  expect(response.status()).toBe(404); 
  const error = await response.json();
  expect(error.message).toBe("Movie not found");
});
