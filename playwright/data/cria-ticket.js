async function getRandomTicketIdAndStore(request) {
    try {
      const response = await request.get('/tickets');
      if (!response.ok()) throw new Error('Erro ao buscar tickets: ' + response.status());
      const tickets = await response.json();
      if (tickets.length === 0) {
        throw new Error('Nenhum ticket encontrado.');
      }
      const randomIndex = Math.floor(Math.random() * tickets.length);
      const randomTicket = tickets[randomIndex];
      return randomTicket._id;
    } catch (error) {
      console.error('Erro:', error.message);
    }
  }
  
  export { getRandomTicketIdAndStore };
  