import { test, expect } from "@playwright/test";
import { getRandomTicketIdAndStore } from "../../data/cria-ticket.js"; // Importa a função

test("Deve excluir ingresso com sucesso", async ({ request }) => {
  const ticketId = await getRandomTicketIdAndStore(request);
  const deleteResponse = await request.delete(`/tickets/${ticketId}`);
  expect(deleteResponse.status()).toBe(200);
  const checkResponse = await request.get(`/tickets/${ticketId}`);
  expect(checkResponse.status()).toBe(404);
  const errorResponse = await checkResponse.json();
  expect(errorResponse.message).toBe(`Ticket with ID ${ticketId} not found.`);
});

test("Falha ao excluir um ingresso inexistente", async ({ request }) => {
  const nonexistentTicketId = "id_inexistente";
  const deleteResponse = await request.delete(
    `/tickets/${nonexistentTicketId}`
  );
  expect(deleteResponse.status()).toBe(404);
  const errorResponse = await deleteResponse.json();
  expect(errorResponse.message).toBe(
    "Ticket with ID id_inexistente not found."
  );
});

/* MELHORIA REPORTADA
  test("Deve falhar ao excluir ingresso sem autorização", async ({ request }) => {
    const ticketId = await getRandomTicketIdAndStore(request);
    const response = await request.delete(`/tickets/${ticketId}`, {
      headers: { Authorization: "" }, 
    });
    expect(response.status()).toBe(401);
    const errorResponse = await response.json();
    expect(errorResponse.message).toBe("Token inválido ou ausente");
  }); */
