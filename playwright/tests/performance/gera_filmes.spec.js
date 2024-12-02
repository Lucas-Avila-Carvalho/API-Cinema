import { test, expect } from "@playwright/test";
test("Performance ao criar e excluir vários filmes", async ({ request }) => {
  const totalMovies = 100;
  const startTime = Date.now();
  const movieCreationPromises = [];
  const movieIds = []; // Armazenar os IDs dos filmes criados

  // Criando filmes
  for (let i = 0; i < totalMovies; i++) {
    const movieData = {
      title: `Título ${i + 1}`,
      description: `Descrição do filme ${i + 1}`,
      launchdate: new Date().toISOString(),
      showtimes: ["2024-12-20T19:30:00Z"],
    };

    // Enviar a criação de filme e coletar a resposta
    const response = request.post("/movies", { data: movieData });
    movieCreationPromises.push(response);
  }

  const responses = await Promise.all(movieCreationPromises);

  const endTime = Date.now();
  const duration = endTime - startTime;

  // Verificando se todos os filmes foram criados com sucesso
  for (const response of responses) {
    expect(response.status()).toBe(201);  // Esperando status 201
  }

  console.log(`Criados ${totalMovies} filmes em ${duration} ms`);
  expect(duration).toBeLessThan(5000);  // Ajuste o limite conforme necessário

  // Coletando os IDs dos filmes criados diretamente do cabeçalho 'Location'
  for (const response of responses) {
    const locationHeader = response.headers()['location'];
    if (locationHeader) {
      const movieId = locationHeader.split('/').pop();  // Extraindo o ID do filme do cabeçalho 'Location'
      movieIds.push(movieId);  // Armazenando o ID de cada filme
    }
  }

  // Deletar os filmes criados
  const deletePromises = [];
  for (const movieId of movieIds) {
    deletePromises.push(request.delete(`/movies/${movieId}`));  // Deletando cada filme pelo ID
  }

  const deleteResponses = await Promise.all(deletePromises);

  // Verificar se todos os filmes foram deletados com sucesso
  for (const deleteResponse of deleteResponses) {
    expect(deleteResponse.status()).toBe(200);  // Esperando status 200 para exclusão bem-sucedida
  }

  console.log(`Deletados ${totalMovies} filmes`);
});


