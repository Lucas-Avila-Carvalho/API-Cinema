import { test, expect } from "@playwright/test";

test("Deve cadastrar um ingresso válido", async ({ request }) => {
  const ticketData = {
    movieId: "validMovieId123",
    userId: "validUserId123",
    seatNumber: 15,
    price: 50,
    showtime: "2024-12-01T15:00:00Z",
  };

  const response = await request.post("/tickets", {
    data: ticketData,
  });

  expect(response.status()).toBe(201);
  const createdTicket = await response.json();
  expect(createdTicket).toHaveProperty("_id");
  expect(createdTicket.movieId).toBe(ticketData.movieId);
  expect(createdTicket.userId).toBe(ticketData.userId);
  expect(createdTicket.seatNumber).toBe(ticketData.seatNumber);
  expect(createdTicket.price).toBe(ticketData.price);
});

test("Deve falhar ao cadastrar ingresso com número de assento fora do intervalo (0-100)", async ({
  request,
}) => {
  const ticketData = {
    movieId: "validMovieId123",
    userId: "validUserId123",
    seatNumber: 150,
    price: 50,
    showtime: "2024-12-01T15:00:00Z",
  };
  const response = await request.post("/tickets", {
    data: ticketData,
  });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  expect(errorResponse.message).toContain(
    "Valor do assento deve ser menor ou igual a 100"
  );
});

test("Deve falhar ao cadastrar ingresso com preço acima do limite (60)", async ({
  request,
}) => {
  const ticketData = {
    movieId: "validMovieId123",
    userId: "validUserId123",
    seatNumber: 50,
    price: 100,
    showtime: "2024-12-01T15:00:00Z",
  };

  const response = await request.post("/tickets", {
    data: ticketData,
  });
  expect(response.status()).toBe(400);
  const errorResponse = await response.json();
  if (Array.isArray(errorResponse.message)) {
    expect(errorResponse.message).toContain(
      "Preço deve ser menor ou igual a 60"
    );
  } else {
    expect(errorResponse.message).toBe("Preço deve ser menor ou igual a 60");
  }
});

/* BUG REPORTADO
  test("Deve falhar ao cadastrar ingresso sem os campos obrigatórios (movieId e userId)", async ({ request }) => {
    const ticketData = {
      seatNumber: 15,
      price: 50,
      showtime: "2024-12-01T15:00:00Z",
    };
    const response = await request.post("/tickets", {
      data: ticketData,
    });
    expect(response.status()).toBe(400); 
    const errorResponse = await response.json();
    expect(errorResponse.message).toContain("O campo movieId é obrigatório");
    expect(errorResponse.message).toContain("O campo userId é obrigatório");
  });*/

/* MELHORIA REPORTADA
test("Deve falhar ao cadastrar ingresso sem autenticação", async ({ request }) => {
    const ticketData = {
      movieId: "validMovieId123",
      userId: "validUserId123",
      seatNumber: 15,
      price: 50,
      showtime: "2024-12-01T15:00:00Z",
    };
    const response = await request.post("/tickets", {
      data: ticketData,
      headers: { Authorization: "" },
    });
    expect(response.status()).toBe(401);
    const errorResponse = await response.json();
    expect(errorResponse.message).toBe("Token inválido ou ausente");
  });
  */
