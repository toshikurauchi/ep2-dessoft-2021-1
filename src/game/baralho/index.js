const ESPADAS = "♠";
const COPAS = "♥";
const OUROS = "♦";
const PAUS = "♣";
const VALORES = "A23456789JQK".split("").concat(["10"]);

export const baralhoAleatorio = () => {
  let baralho = [ESPADAS, COPAS, OUROS, PAUS]
    .map((naipe) => VALORES.map((valor) => valor + naipe))
    .flat();
  baralho = baralho.sort(() => Math.random() - 0.5);
  return baralho;
};

export const parseCarta = (carta) => {
  return {
    valor: carta.substr(0, carta.length - 1),
    naipe: carta.charAt(carta.length - 1),
  };
};

export const listaMovimentosPossiveis = (baralho, indice) => {
  const carta = parseCarta(baralho[indice]);

  const movimentosPossiveis = [];

  if (indice > 0) {
    const vizinho = parseCarta(baralho[indice - 1]);
    if (carta.valor === vizinho.valor || carta.naipe === vizinho.naipe)
      movimentosPossiveis.push(1);
  }
  if (indice > 2) {
    const vizinho = parseCarta(baralho[indice - 3]);
    if (carta.valor === vizinho.valor || carta.naipe === vizinho.naipe)
      movimentosPossiveis.push(3);
  }

  return movimentosPossiveis;
};

export const possuiMovimentosPossiveis = (baralho) => {
  console.log(baralho);
  for (let indice = 0; indice < baralho.length; indice++) {
    if (listaMovimentosPossiveis(baralho, indice).length) return true;
  }
  return false;
};

export const move = (baralho, origem, destino) => {
  const proximoBaralho = [];
  for (let i = 0; i < baralho.length - 1; i++) {
    let carta;
    if (i < destino) carta = baralho[i];
    else if (i === destino) carta = baralho[origem];
    else if (i < origem) carta = baralho[i];
    else carta = baralho[i + 1];
    proximoBaralho.push(carta);
  }
  return proximoBaralho;
};
