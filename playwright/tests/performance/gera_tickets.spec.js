import { test, expect } from "@playwright/test";

test("Performance ao criar e excluir vários ingressos", async ({ request }) => {
  const totalTickets = 100;  
  const ticketIds = [];  // Armazenar os IDs dos ingressos criados
  
  const startTime = Date.now();
  const ticketCreationPromises = [];

  // Criando ingressos
  for (let i = 0; i < totalTickets; i++) {
    const ticketData = {
      movieId: `movieId-${i + 1}`,  
      userId: `userId-${i + 1}`,    
      seatNumber: Math.floor(Math.random() * 100), 
      price: Math.floor(Math.random() * 60) + 1,    
      showtime: new Date().toISOString(), 
    };

    const response = request.post("/tickets", { data: ticketData });
    ticketCreationPromises.push(response);
  }

  const responses = await Promise.all(ticketCreationPromises);

  const endTime = Date.now();
  const duration = endTime - startTime;

  // Verificando se todos os ingressos foram criados com sucesso
  for (const response of responses) {
    expect(response.status()).toBe(201);  // Esperando status 201
  }
  console.log(`Criados ${totalTickets} ingressos em ${duration} ms`);
  expect(duration).toBeLessThan(5000);  // Ajuste o limite conforme necessário

  // Coletando os IDs dos ingressos criados (assumindo que a resposta tem os IDs dos ingressos)
  for (const response of responses) {
    const ticket = await response.json(); // Obtém os dados da resposta
    ticketIds.push(ticket._id);  // Armazenando o ID de cada ingresso
  }

  // Deletando os ingressos criados
  const deletePromises = ticketIds.map(ticketId => 
    request.delete(`/tickets/${ticketId}`)
  );

  const deleteResponses = await Promise.all(deletePromises);

  // Verificando se todos os ingressos foram deletados com sucesso
  for (const deleteResponse of deleteResponses) {
    expect(deleteResponse.status()).toBe(200);  // Esperando status 200 para exclusão bem-sucedida
  }

  console.log(`Deletados ${totalTickets} ingressos`);
});
