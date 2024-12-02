import { test, expect } from "@playwright/test";
import { getRandomTicketIdAndStore } from '../../data/cria-ticket.js';

test("Deve listar todos os ingressos cadastrados", async ({ request }) => {
  const response = await request.get("/tickets");
  expect(response.status()).toBe(200);
  const tickets = await response.json();
  expect(Array.isArray(tickets)).toBe(true);  
  expect(tickets.length).toBeGreaterThan(0);  
});
test("Deve filtrar ingressos por _id", async ({ request }) => {
  const ticketId = await getRandomTicketIdAndStore(request);  
  const response = await request.get(`/tickets/${ticketId}`);
  expect(response.status()).toBe(200); 
  const ticket = await response.json(); 
  expect(ticket._id).toBe(ticketId);  
});

test("Verificar tempo de resposta com 1000 ingressos cadastrados", async ({ request }) => {
  const start = Date.now(); 
  const response = await request.get('/tickets');
  const end = Date.now();
  expect(response.status()).toBe(200);  
  const elapsedTime = end - start; 
  expect(elapsedTime).toBeLessThan(300); 
});
test("Deve retornar erro ao buscar ticket inexistente por ID", async ({ request }) => {
  const invalidTicketId = "invalidTicketId"; 
  const response = await request.get(`/tickets/${invalidTicketId}`);
  expect(response.status()).toBe(404); 
  const errorResponse = await response.json();
  expect(errorResponse.message).toBe("Ticket with ID invalidTicketId not found.");
});


test("Deve buscar um ticket existente por ID", async ({ request }) => {
  const ticketId = await getRandomTicketIdAndStore(request); 
  const response = await request.get(`/tickets/${ticketId}`);
  expect(response.status()).toBe(200);  
  const ticket = await response.json();
  expect(ticket._id).toBe(ticketId);  
});

/* MELHORIA REPORTADA
test("Deve falhar ao listar os ingressos sem autorização", async ({ request }) => {
  const response = await request.get("/tickets", {
    headers: { Authorization: "" },
  });
  expect(response.status()).toBe(401);
  const errorResponse = await response.json();
  expect(errorResponse.message).toBe("Token inválido ou ausente");
});*/