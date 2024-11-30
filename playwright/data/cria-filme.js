import fetch from 'node-fetch';
import fs from 'fs';

async function getRandomMovieIdAndStore() {
  try {
    // Faz uma requisição GET para obter todos os filmes
    const response = await fetch('http://localhost:3000/movies');
    
    if (!response.ok) throw new Error('Erro ao buscar filmes: ' + response.statusText);
    
    const movies = await response.json();
    
    if (movies.length === 0) {
      throw new Error('Nenhum filme encontrado.');
    }
    
    // Escolhe um filme aleatório da lista
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    
    // Pega o ID do filme aleatório
    const movieId = randomMovie._id;
    
    console.log('Filme aleatório encontrado! ID:', movieId);
    
    // Armazena o ID no arquivo 'validMovieId.json'
    fs.writeFileSync('validMovieId.json', JSON.stringify({ id: movieId }, null, 2));
    console.log('ID armazenado no arquivo validMovieId.json');
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

getRandomMovieIdAndStore();
