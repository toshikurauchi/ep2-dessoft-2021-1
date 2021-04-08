import { baralhoAleatorio } from ".";

test("Devolve um baralho aleatório", () => {
  const baralho = baralhoAleatorio();
  console.log(baralho);
  expect(baralho.length).toBe(52);
});
