import { test, expect } from "@playwright/test";
import { getRandomMovieIdAndStore } from "../../data/cria-filme";

test("Deve reservar ingressos para um filme", async ({ request }) => {
  const movieId = await getRandomMovieIdAndStore(request);
  const ticketData = {
    movieId,
    seatNumber: 12,
    price: 50,
    showtime: "2024-12-15T18:30:00Z",
  };

  // Reservar o ingresso
  const response = await request.post("/tickets", { data: ticketData });
  expect(response.status()).toBe(201);
  const createdTicket = await response.json();
  expect(createdTicket.movieId).toBe(movieId);
  expect(createdTicket.seatNumber).toBe(12);
  expect(createdTicket.price).toBe(50);
  expect(createdTicket.showtime).toBe("2024-12-15T18:30:00Z");
});
