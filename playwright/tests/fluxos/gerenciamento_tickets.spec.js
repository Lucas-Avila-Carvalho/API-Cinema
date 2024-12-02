import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from "../../data/cria-filme.js";
import { getRandomTicketIdAndStore } from "../../data/cria-ticket.js";

test("Gerenciamento completo de ingressos", async ({ request }) => {
  // 1. Criar um filme (usando a função já existente para gerar filme)
  const movieId = await getRandomMovieIdAndStore(request);

  // 2. Gerar um ingresso utilizando a função getRandomTicketIdAndStore
  const { ticketId, userId, seatNumber, price, showtime } = await getRandomTicketIdAndStore(request, movieId);

  // Verificando se os valores de seatNumber e price estão corretos
  const correctedSeatNumber = seatNumber && seatNumber >= 0 && seatNumber <= 100 ? seatNumber : 10;  // Garantir que o número do assento esteja entre 0 e 100
  const correctedPrice = price && price >= 0 && price <= 60 ? price : 30;  // Garantir que o preço esteja entre 0 e 60

  // Corrigir o formato de showtime para garantir que esteja em ISO 8601
  const correctedShowtime = showtime ? new Date(showtime).toISOString() : "2024-12-20T19:30:00Z";

  // 3. Criar o ingresso com o formato esperado pela API
  const ticketData = {
    movieId: movieId,
    userId: userId,
    seatNumber: correctedSeatNumber,
    price: correctedPrice,
    showtime: correctedShowtime,
  };

  // 4. Enviar requisição para criar o ingresso
  const createResponse = await request.post("/tickets", { data: ticketData });

  // Exibir o corpo da resposta para entender o erro
  const responseBody = await createResponse.body();

  // Verificar o status de criação
  expect(createResponse.status()).toBe(201);  // Esperando status 201

  const ticket = await createResponse.json();

  // 5. Obter o ingresso pelo ID
  const getResponse = await request.get(`/tickets/${ticket._id}`);

  expect(getResponse.status()).toBe(200);
  const fetchedTicket = await getResponse.json();
  expect(fetchedTicket.seatNumber).toBe(correctedSeatNumber);

  // 6. Atualizar o ingresso (incluir seatNumber e showtime, se necessário)
const updateResponse = await request.put(`/tickets/${ticket._id}`, {
    data: { 
      price: 50,  // Novo preço
      seatNumber: 10,  // Número do assento
      showtime: "2024-12-20T19:30:00Z"  // Data e hora da apresentação
    },
  });
  
  // Exibir a resposta de erro para ajudar na depuração
  const updateResponseBody = await updateResponse.body();
  expect(updateResponse.status()).toBe(200);  // Esperando status 200
  

  // 7. Excluir o ingresso
  const deleteResponse = await request.delete(`/tickets/${ticket._id}`);
  expect(deleteResponse.status()).toBe(200);

  // Validar exclusão
  const verifyResponse = await request.get(`/tickets/${ticket._id}`);
  expect(verifyResponse.status()).toBe(404);
});
