import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Terminal from "../src/components/Terminal";
import Text from "../src/components/Terminal/Text";
import TextInput from "../src/components/Terminal/TextInput";
import { textoInicial, passoInicial } from "../src/game";

const Container = styled.div`
  max-width: 950px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: normal;
`;

const tokenColors = {
  "♠": "blue",
  "♥": "red",
  "♦": "purple",
  "♣": "green",
};

function escolheCor(token) {
  for (let naipe in tokenColors) {
    if (token.indexOf(naipe) >= 0) return tokenColors[naipe];
  }
  return "white";
}

function parseLinha(linha, idx) {
  if (!linha) return null;
  return linha.split(" ").map((token, idx2) => (
    <Text color={escolheCor(token)} key={`linha__${idx}__${idx2}__${token}`}>
      {token}{" "}
    </Text>
  ));
}

function geraConteudo(texto, offset) {
  const linhas = texto.split("\n");
  let conteudo = [];
  offset = offset || 0;

  linhas.forEach((linha, idx) => {
    conteudo = conteudo.concat(parseLinha(linha, idx + offset));
    conteudo.push(<br key={`br__${idx + offset}__${linha}`} />);
  });
  return conteudo;
}

function adicionaConteudoDoInput(conteudoAnterior, texto, input) {
  return conteudoAnterior
    .concat(parseLinha(texto, conteudoAnterior.length))
    .concat([
      <Text color="input" key={`input__${conteudoAnterior.length}__${texto}`}>
        {input}
      </Text>,
      <br key={`br__${conteudoAnterior.length}__${texto}`} />,
    ]);
}

function adicionaConteudo(conteudoAnterior, texto) {
  return conteudoAnterior.concat(geraConteudo(texto, conteudoAnterior.length));
}

export default function Home() {
  const [conteudo, setConteudo] = useState(geraConteudo(textoInicial));

  const criaInput = ({ texto, onEnter }) => {
    return {
      texto,
      onEnter: (digitado) => {
        setConteudo((conteudo) =>
          adicionaConteudoDoInput(conteudo, texto, digitado)
        );
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
        const proximoPasso = onEnter && onEnter(digitado);
        if (proximoPasso) {
          proximoPasso.textoAdicional &&
            setConteudo((conteudo) =>
              adicionaConteudo(conteudo, proximoPasso.textoAdicional)
            );
          setProximoInput(criaInput(proximoPasso));
        } else {
          setProximoInput(null);
        }
      },
    };
  };

  const [proximoInput, setProximoInput] = useState(criaInput(passoInicial));
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conteudo, inputRef.current]);

  return (
    <Container>
      <Title>Paciência Acordeão</Title>
      <Subtitle>Design de Software - Insper</Subtitle>

      <p>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            location.reload();
          }}
        >
          Recarregue a página
        </a>{" "}
        para começar novamente.
      </p>

      <p>
        Este é um exemplo do que esperamos de um EP2 completo. Ele é jogável,
        então você pode testar as regras no terminal abaixo.
      </p>

      <Terminal
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        {conteudo}
        {proximoInput && parseLinha(proximoInput.texto, conteudo.length)}
        {proximoInput && (
          <TextInput ref={inputRef} onEnter={proximoInput.onEnter} />
        )}
      </Terminal>
    </Container>
  );
}
