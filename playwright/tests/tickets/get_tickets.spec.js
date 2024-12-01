import { test, expect } from "@playwright/test";

test("Deve listar todos os ingressos cadastrados", async ({ request }) => {
  const response = await request.get("/tickets");
  expect(response.status()).toBe(200);
  const tickets = await response.json();
  expect(Array.isArray(tickets)).toBe(true);  
  expect(tickets.length).toBeGreaterThan(0);  
});
