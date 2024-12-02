import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from "../../data/cria-filme";

test("Deve atualizar um filme com um ID aleatório", async ({ request }) => {
  const movieId = await getRandomMovieIdAndStore(request);

  const updatedMovieData = {
    title: "Título Atualizado",
    description: "Descrição atualizada do filme",
    launchdate: "2024-12-01T00:00:00Z",
    showtimes: ["2024-12-01T15:00:00Z"],
  };

  const response = await request.put(`/movies/${movieId}`, {
    data: updatedMovieData,
  });

  expect(response.status()).toBe(200);
  const updatedMovie = await response.json();
  expect(updatedMovie._id).toBe(movieId);
  expect(updatedMovie.title).toBe(updatedMovieData.title);
  expect(updatedMovie.description).toBe(updatedMovieData.description);
});

/* BUG REPORTADO
  test("Deve retornar erro 409 ao atualizar com título duplicado", async ({ request }) => {
    const movieId = await getRandomMovieIdAndStore(request);
    const movieData = {
      title: 'Título Duplicado',
      description: 'Descrição duplicada do filme',
      launchdate: '2024-12-01T00:00:00Z',
      showtimes: ['2024-12-01T15:00:00Z'],
    };
  
    const response = await request.put(`/movies/${movieId}`, {
      data: movieData,
    });
    expect(response.status()).toBe(409); 
    const error = await response.json();
    expect(error.message).toBe('Título já cadastrado.');
  });*/

test("Deve retornar erro 404 ao tentar atualizar filme inexistente", async ({
  request,
}) => {
  const invalidMovieId = "ID_INVALIDO_123";
  const updatedMovieData = {
    title: "Título Atualizado",
    description: "Descrição atualizada do filme",
    launchdate: "2024-12-01T00:00:00Z",
    showtimes: ["2024-12-01T15:00:00Z"],
  };
  const response = await request.put(`/movies/${invalidMovieId}`, {
    data: updatedMovieData,
  });
  expect(response.status()).toBe(404);
  const error = await response.json();
  expect(error.message).toBe("Movie not found or not updated");
});

/* BUG REPORTADO
  test("Deve retornar erro 400 ao tentar atualizar filme sem título", async ({ request }) => {
    const movieId = await getRandomMovieIdAndStore(request);
  
    const updatedMovieData = {
      title: '', 
      description: 'Descrição atualizada sem título',
      launchdate: '2024-12-01T00:00:00Z',
      showtimes: ['2024-12-01T15:00:00Z'],
    };
  
    const response = await request.put(`/movies/${movieId}`, {
      data: updatedMovieData,
    });
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.message).toBe('Título é obrigatório.');
  });*/

/* BUG REPORTADO
  test("Deve retornar erro 400 ao tentar atualizar filme com dados incompletos", async ({ request }) => {
    const movieId = await getRandomMovieIdAndStore(request);
  
    const updatedMovieData = {
        title: '', 
        description: '',
        launchdate: '',
        showtimes: [''],
      };
  
    const response = await request.put(`/movies/${movieId}`, {
      data: updatedMovieData,
    });
  
    expect(response.status()).toBe(400); // Código 400 para Bad Request
    const error = await response.json();
    expect(error.message).toBe('Dados incompletos.');
  }); */

test("Deve retornar 200 e atualizar corretamente um filme", async ({
  request,
}) => {
  const movieId = await getRandomMovieIdAndStore(request);

  const updatedMovieData = {
    title: "Novo Título Atualizado",
    description: "Descrição do filme com dados válidos",
    launchdate: "2024-12-01T00:00:00Z",
    showtimes: ["2024-12-01T15:00:00Z"],
  };

  const response = await request.put(`/movies/${movieId}`, {
    data: updatedMovieData,
  });
  expect(response.status()).toBe(200);
  const updatedMovie = await response.json();
  expect(updatedMovie._id).toBe(movieId);
  expect(updatedMovie.title).toBe(updatedMovieData.title);
  expect(updatedMovie.description).toBe(updatedMovieData.description);
  expect(updatedMovie.launchdate).toBe(updatedMovieData.launchdate);
  expect(updatedMovie.showtimes).toEqual(updatedMovieData.showtimes);
});

/* MELHORIA REPORTADA
test("Deve retornar erro 401 ao tentar atualizar filme sem token", async ({ request }) => {
  const movieId = await getRandomMovieIdAndStore(request);
  const updatedMovieData = {
    title: 'Título Atualizado Sem Token',
    description: 'Descrição sem autenticação',
    launchdate: '2024-12-01T00:00:00Z',
    showtimes: ['2024-12-01T15:00:00Z'],
  };
  const response = await request.put(`/movies/${movieId}`, {
    data: updatedMovieData,
    headers: {}, 
  });
  expect(response.status()).toBe(401);
  const error = await response.json();
  expect(error.message).toBe("Token inválido ou ausente");
});
*/
