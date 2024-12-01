async function getRandomMovieIdAndStore(request) {
  try {
    const response = await request.get('/movies');
    if (!response.ok()) throw new Error('Erro ao buscar filmes: ' + response.status());
    const movies = await response.json();
    if (movies.length === 0) {
      throw new Error('Nenhum filme encontrado.');
    }
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie._id;
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

export { getRandomMovieIdAndStore };
