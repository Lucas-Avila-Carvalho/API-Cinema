import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from '../../data/cria-filme';


test("Deve retornar uma lista de filmes com status 200", async ({
  request,
}) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  expect(Array.isArray(movies)).toBe(true);
});

test("Deve validar que todos os filmes retornados possuem os campos esperados", async ({
  request,
}) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  movies.forEach((movie) => {
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("description");
    expect(movie).toHaveProperty("launchdate");
    expect(movie).toHaveProperty("showtimes");
    expect(movie).toHaveProperty("_id");
  });
});

test("Deve validar que os campos retornados têm os tipos esperados", async ({
  request,
}) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  movies.forEach((movie) => {
    expect(typeof movie.title).toBe("string");
    expect(typeof movie.description).toBe("string");
    const iso8601Regex =
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
    if (movie.launchdate && iso8601Regex.test(movie.launchdate)) {
      const launchDate = new Date(movie.launchdate);
      expect(!isNaN(launchDate.getTime())).toBe(true);
    }
    const isValidShowtimes =
      Array.isArray(movie.showtimes) || typeof movie.showtimes === "string";
    expect(isValidShowtimes).toBe(true);
    expect(typeof movie._id).toBe("string");
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

test("Deve validar que todos os IDs são únicos", async ({ request }) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  const ids = movies.map((movie) => movie._id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});

test("Deve retornar status 404 ao buscar um filme com ID inexistente", async ({
  request,
}) => {
  const invalidId = "1234567890abcdef";
  const response = await request.get(`/movies/${invalidId}`);
  expect(response.status()).toBe(404);
  const errorMessage = await response.json();
  expect(errorMessage.message).toBe("Movie not found");
});

test("Deve validar que nenhuma data de lançamento está no futuro", async ({
  request,
}) => {
  const response = await request.get(`/movies`);
  expect(response.status()).toBe(200);
  const movies = await response.json();
  movies.forEach((movie) => {
    const { launchdate, title } = movie;
    if (launchdate) {
      const launchDate = new Date(launchdate);
      if (!isNaN(launchDate.getTime())) {
        expect(launchDate.getTime()).toBeLessThanOrEqual(new Date().getTime());
      }
    }
  });
});

test.describe("GET /movies/:id", () => {
  test("Deve retornar 200 ao enviar um ID válido", async ({ request }) => {
    const movieId = await getRandomMovieIdAndStore(request);
    const response = await request.get(`/movies/${movieId}`);
    expect(response.status()).toBe(200);
    const movie = await response.json()
    expect(movie).toHaveProperty("_id", movieId);
  });
});

/* MELHORIA REPORTADA
test('Não deve listar filmes sem autenticação', async ({ request }) => {
  const response = await request.get(`/movies`, { headers: {} });
  expect(response.status()).toBe(401);

  const errorResponse = await response.json();
  expect(errorResponse.message).toContain('Token inválido ou ausente');
}); */
