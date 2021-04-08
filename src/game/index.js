import {
  baralhoAleatorio,
  listaMovimentosPossiveis,
  move,
  possuiMovimentosPossiveis,
} from "./baralho";

export const textoInicial = `Paciência Acordeão
==================

Seja bem-vindo(a) ao jogo de Paciência Acordeão! O objetivo deste jogo é colocar todas as cartas em uma mesma pilha.

Existem apenas dois movimentos possíveis:

1. Empilhar uma carta sobre a carta imediatamente anterior;
2. Empilhar uma carta sobre a terceira carta anterior.

Para que um movimento possa ser realizado basta que uma das duas condições abaixo seja atendida:

1. As duas cartas possuem o mesmo valor ou
2. As duas cartas possuem o mesmo naipe.

Desde que alguma das condições acima seja satisfeita, qualquer carta pode ser movimentada.
`;

export const passoInicial = {
  texto: "Aperte [Enter] para iniciar o jogo...",
  onEnter: () => escolheCarta(),
};

const proximoPassoPosicao = (baralho, digitado) => {
  if (1 <= digitado && digitado <= baralho.length) {
    const indice = digitado - 1;
    const movimentosPossiveis = listaMovimentosPossiveis(baralho, indice);
    if (movimentosPossiveis.length === 1)
      return escolheCarta(
        move(baralho, indice, indice - movimentosPossiveis[0])
      );
    else if (movimentosPossiveis.length > 1)
      return escolheMovimento(baralho, indice, movimentosPossiveis);
    return posicaoInvalida(baralho, {
      tipo: "sem-movimentos",
      carta: baralho[indice],
    });
  } else return posicaoInvalida(baralho);
};

const jogarNovamente = (baralho) => {
  let textoAdicional;
  if (baralho.length === 1) textoAdicional = "Parabéns! Você venceu!!!\n";
  else textoAdicional = "Você perdeu :(\n";

  return {
    textoAdicional,
    texto: "Você quer jogar novamente (digite s ou n)? ",
    onEnter: (digitado) => {
      if (digitado.toLowerCase() === "s") return escolheCarta();
      else return null;
    },
  };
};

const escolheCarta = (baralho) => {
  if (!baralho) baralho = baralhoAleatorio();
  else if (baralho.length === 1 || !possuiMovimentosPossiveis(baralho))
    return jogarNovamente(baralho);
  return {
    textoAdicional: `
O estado atual do baralho é:
${baralho
  .map(
    (carta, idx) =>
      `${(idx + 1).toString().padStart(2, " ")}. ${carta.padStart(3, " ")}\n`
  )
  .join("")}`,
    texto: `Escolha uma carta (digite um número entre 1 e ${baralho.length}): `,
    onEnter: (digitado) => proximoPassoPosicao(baralho, digitado),
  };
};

const escolheMovimento = (baralho, indice, movimentosPossiveis, erro) => {
  return {
    textoAdicional:
      `${erro ? "Opção inválida. " : ""}Sobre qual carta você quer empilhar o ${
        baralho[indice]
      }?
` +
      movimentosPossiveis
        .map(
          (movimento, idx) => ` ${idx + 1}. ${baralho[indice - movimento]}
`
        )
        .reduce((a, b) => a + b, ""),
    texto: `Digite o número de sua escolha (1-${baralho.length}): `,
    onEnter: (digitado) => {
      if (1 <= digitado && digitado <= movimentosPossiveis.length)
        return escolheCarta(
          move(baralho, indice, indice - movimentosPossiveis[digitado - 1])
        );
      else return escolheMovimento(baralho, indice, movimentosPossiveis, true);
    },
  };
};

const posicaoInvalida = (baralho, detalhes) => {
  const { tipo, carta } = detalhes || {};
  return {
    texto: `${
      tipo === "sem-movimentos"
        ? `A carta ${carta} não pode ser movida.`
        : "Posição inválida."
    } Por favor, digite um número entre 1 e ${baralho.length}): `,
    onEnter: (digitado) => proximoPassoPosicao(baralho, digitado),
  };
};
