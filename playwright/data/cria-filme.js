const fetch = require('node-fetch'); // Instale com `npm install node-fetch`
const fs = require('fs');

// Dados para criar o filme
const newMovie = {
  title: "Filme Exemplo",
  description: "Descrição do filme exemplo.",
  launchdate: new Date().toISOString(),
  showtimes: ["2024-12-01T10:00:00", "2024-12-01T12:00:00"]
};

// Função para criar um filme e armazenar o ID
async function createMovieAndStoreId() {
  try {
    // Fazer requisição POST para criar o filme
    const response = await fetch('https://sua-api.com/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie)
    });

    // Verificar se a requisição foi bem-sucedida (status 200)
    if (!response.ok) {
      throw new Error('Erro ao criar o filme: ' + response.statusText);
    }

    // Obter os dados do filme criado
    const createdMovie = await response.json();

    // Verificar se o ID foi retornado corretamente
    if (createdMovie && createdMovie._id) {
      const movieId = createdMovie._id;
      console.log('Filme criado com sucesso! ID:', movieId);

      // Armazenar o ID em um arquivo para uso futuro
      fs.writeFileSync('validMovieId.json', JSON.stringify({ id: movieId }, null, 2));
      console.log('ID armazenado no arquivo validMovieId.json');
    } else {
      throw new Error('ID do filme não encontrado na resposta');
    }
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Chamar a função para criar o filme e armazenar o ID
createMovieAndStoreId();
