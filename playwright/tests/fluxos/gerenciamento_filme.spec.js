import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from "../../data/cria-filme";

test("Gerenciamento completo de filmes com validação de resposta detalhada", async ({ request }) => {
  // 1. Criar um filme e armazenar o ID
  const movieId = await getRandomMovieIdAndStore(request);

  // 2. Listar filmes e validar o formato da resposta
  const listResponse = await request.get("/movies", {
    timeout: 60000, // Aumentando o timeout para 60 segundos
  });
  expect(listResponse.status()).toBe(200);

  const movies = await listResponse.json();

  // Validar estrutura da resposta
  movies.forEach(movie => {
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("description");
    expect(movie).toHaveProperty("launchdate");
    expect(movie).toHaveProperty("showtimes");
    expect(movie).toHaveProperty("_id");

    expect(typeof movie.title).toBe("string");
    expect(typeof movie.description).toBe("string");
    expect(new Date(movie.launchdate).toString()).not.toBe("Invalid Date");
    expect(Array.isArray(movie.showtimes)).toBeTruthy();
    expect(typeof movie._id).toBe("string");
  });

  // 3. Atualizar o filme com tentativas e timeout maior
  console.log(`Atualizando filme com ID: ${movieId}`);
  const updateResponse = await request.put(`/movies/${movieId}`, {
    data: { title: "Teste Filme Atualizado" },
    timeout: 60000,  // Aumentando o timeout para 60 segundos
    retry: { times: 3, interval: 1000 },  // Tentando até 3 vezes com intervalo de 1 segundo
  });
  console.log(`Status da resposta de atualização: ${updateResponse.status()}`);
  expect(updateResponse.status()).toBe(200);

  // 4. Obter o filme atualizado
  const getResponse = await request.get(`/movies/${movieId}`, {
    timeout: 60000,  // Aumentando o timeout para 60 segundos
  });
  console.log(`Status da resposta de obtenção do filme: ${getResponse.status()}`);
  expect(getResponse.status()).toBe(200);

  const updatedMovie = await getResponse.json();
  expect(updatedMovie.title).toBe("Teste Filme Atualizado");

  // Validar estrutura do filme atualizado
  expect(updatedMovie).toHaveProperty("title");
  expect(updatedMovie).toHaveProperty("description");
  expect(updatedMovie).toHaveProperty("launchdate");
  expect(updatedMovie).toHaveProperty("showtimes");
  expect(updatedMovie).toHaveProperty("_id");

  // 5. Excluir o filme
  console.log(`Excluindo filme com ID: ${movieId}`);
  const deleteResponse = await request.delete(`/movies/${movieId}`, {
    timeout: 60000,  // Aumentando o timeout para 60 segundos
    retry: { times: 3, interval: 1000 },  // Tentando até 3 vezes com intervalo de 1 segundo
  });
  console.log(`Status da resposta de exclusão: ${deleteResponse.status()}`);
  expect(deleteResponse.status()).toBe(200);

  // Verificar exclusão
  const verifyResponse = await request.get(`/movies/${movieId}`, {
    timeout: 60000,  // Aumentando o timeout para 60 segundos
  });
  console.log(`Status da resposta de verificação da exclusão: ${verifyResponse.status()}`);
  expect(verifyResponse.status()).toBe(404);
});
