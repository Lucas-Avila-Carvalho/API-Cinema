async function getRandomMovieIdAndStore(request) {
  try {
    const response = await request.get('/movies');
    if (response.status() !== 200) {
      throw new Error(`Erro ao buscar filmes: Status ${response.status()}`);
    }

    const movies = await response.json();
    if (movies.length === 0) {
      return null; 
    }
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie._id;
  } catch (error) {
    return null; 
  }
}

export { getRandomMovieIdAndStore };
