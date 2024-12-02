import { test, expect } from "@playwright/test";
import { getRandomTicketIdAndStore } from "../../data/cria-ticket.js";

test("Deve atualizar preço e assento de um ingresso existente", async ({
  request,
}) => {
  const ticketId = await getRandomTicketIdAndStore(request);

  const updatedTicketData = {
    seatNumber: 25,
    price: 40,
    showtime: "2024-12-05T18:30:00Z",
  };
  const response = await request.put(`/tickets/${ticketId}`, {
    data: updatedTicketData,
  });
  expect(response.status()).toBe(200);
  const updatedTicket = await response.json();
  expect(updatedTicket.seatNumber).toBe(updatedTicketData.seatNumber);
  expect(updatedTicket.price).toBe(updatedTicketData.price);
  expect(updatedTicket.showtime).toBe(updatedTicketData.showtime);
});

test("Deve retornar 404 ao tentar atualizar um ingresso inexistente", async ({
  request,
}) => {
  const invalidTicketId = "nonExistentTicketId123";
  const updatedTicketData = {
    seatNumber: 25,
    price: 40,
    showtime: "2024-12-05T18:30:00Z",
  };
  const response = await request.put(`/tickets/${invalidTicketId}`, {
    data: updatedTicketData,
  });
  expect(response.status()).toBe(404);
  const errorResponse = await response.json();
  expect(errorResponse.message).toBe(
    "Ticket with ID nonExistentTicketId123 not found."
  );
});

test("Deve retornar 400 ao atualizar ingresso com assento inválido", async ({
  request,
}) => {
  const ticketId = await getRandomTicketIdAndStore(request);
  const updatedTicketData = {
    seatNumber: 150,
    price: 40,
    showtime: "2024-12-05T18:30:00Z",
  };
  const response = await request.put(`/tickets/${ticketId}`, {
    data: updatedTicketData,
  });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse.message[0]).toBe(
    "Valor do assento deve ser menor ou igual a 100"
  );
});
test("Deve retornar 400 ao atualizar ingresso com preço inválido", async ({
  request,
}) => {
  const ticketId = await getRandomTicketIdAndStore(request);
  const updatedTicketData = {
    seatNumber: 25,
    price: 100,
    showtime: "2024-12-05T18:30:00Z",
  };

  const response = await request.put(`/tickets/${ticketId}`, {
    data: updatedTicketData,
  });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse.message[0]).toBe("Preço deve ser menor ou igual a 60");
});

test("Deve retornar 400 ao atualizar ingresso sem fornecer campos obrigatórios", async ({
  request,
}) => {
  const ticketId = await getRandomTicketIdAndStore(request);
  const updatedTicketData = {};
  const response = await request.put(`/tickets/${ticketId}`, {
    data: updatedTicketData,
  });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  const expectedMessages = [
    "Número do assento é mandatório",
    "Preço do ingresso é mandatório",
    "Data de apresentação é mandatória",
  ];
  expectedMessages.forEach((message) => {
    expect(errorResponse.message).toEqual(expect.arrayContaining([message]));
  });
});

/* MELHORIA REPORTADA
test("Deve falhar ao atualizar ingresso sem autorização", async ({
  request,
}) => {
  const ticketId = await getRandomTicketIdAndStore(request);
  const updatedTicketData = {
    seatNumber: 25,
    price: 50,
    showtime: "2024-12-05T18:30:00Z",
  };
  const response = await request.put(`/tickets/${ticketId}`, {
    data: updatedTicketData,
    headers: { Authorization: "" },
  });
  expect(response.status()).toBe(401);
  const errorResponse = await response.json();
  expect(errorResponse.message).toBe("Token inválido ou ausente");
});
*/