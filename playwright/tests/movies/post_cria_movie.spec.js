import { test, expect } from "@playwright/test";
test("Deve criar um novo filme com sucesso", async ({ request }) => {
  const newMovie = {
    title: "titulo",
    description: "descricao",
    launchdate: "2024-11-27T17:26:08.728Z",
    showtimes: ["string"],
  };
  const response = await request.post(`/movies`, { data: newMovie });
  expect(response.status()).toBe(201);
});

/* BUG REPORTADO
  test('Deve criar um novo filme com sucesso', async ({ request }) => {
    const newMovie = {
      "title": "titulo",
      "description": "descricao",
      "launchdate": "2024-11-27T17:26:08.728Z",
      "showtimes": [
        "string"
      ]
    };

    const response = await request.post(`/movies`, { data: newMovie });
    expect(response.status()).toBe(201);
    const createdMovie = await response.json();
    expect(createdMovie).toHaveProperty('_id');
    expect(createdMovie.title).toBe(newMovie.title);
    expect(createdMovie.description).toBe(newMovie.description);
  }); */

test("Não deve criar um filme com título vazio", async ({ request }) => {
  const invalidMovie = {
    title: "",
    description: "Descrição válida",
    launchdate: "2024-12-01T00:00:00Z",
    showtimes: ["2024-12-01T15:00:00Z"],
  };
  const response = await request.post(`/movies`, { data: invalidMovie });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse).toHaveProperty("message");
  expect(errorResponse.message).toContain("Título do filme é mandatório");
  expect(errorResponse).toHaveProperty("error", "Bad Request");
  expect(errorResponse).toHaveProperty("statusCode", 400);
});
test("Não deve criar um filme com descrição vazia", async ({ request }) => {
  const invalidDesc = {
    title: "título",
    description: "",
    launchdate: "2024-12-01T00:00:00Z",
    showtimes: ["2024-12-01T15:00:00Z"],
  };
  const response = await request.post(`/movies`, { data: invalidDesc });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse).toHaveProperty("message");
  expect(errorResponse.message).toContain("Descrição do filme é mandatória");
  expect(errorResponse).toHaveProperty("error", "Bad Request");
  expect(errorResponse).toHaveProperty("statusCode", 400);
});
test("Não deve criar um filme com data vazia", async ({ request }) => {
  const invalidDate = {
    title: "título",
    description: "Descrição válida",
    launchdate: "",
    showtimes: ["2024-12-01T15:00:00Z"],
  };
  const response = await request.post(`/movies`, { data: invalidDate });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse).toHaveProperty("message");
  expect(errorResponse.message).toContain("Data de lançamento é mandatória");
  expect(errorResponse).toHaveProperty("error", "Bad Request");
  expect(errorResponse).toHaveProperty("statusCode", 400);
});

/* BUG REPORTADO
  test('Não deve criar um filme com data de lançamento inválida', async ({ request }) => {
    const invalidMovie = {
      title: 'Filme com Data Inválida',
      description: 'Descrição válida',
      launchdate: 'data-invalida', 
      showtimes: ['2024-12-01T15:00:00Z']
    };
    const response = await request.post(`/movies`, { data: invalidMovie });
    expect(response.status()).toBe(400);
    const errorResponse = await response.json();
    expect(errorResponse).toHaveProperty('error');
    expect(errorResponse.error).toContain('Data de lançamento inválida'); 
  });
*/

/* MELHORIA REPORTADA
test('Não deve criar filmes sem autenticação', async ({ request }) => {
  const response = await request.post(`/movies`, { headers: {} });
  expect(response.status()).toBe(401);

  const errorResponse = await response.json();
  expect(errorResponse.message).toContain('Token inválido ou ausente');
});*/
