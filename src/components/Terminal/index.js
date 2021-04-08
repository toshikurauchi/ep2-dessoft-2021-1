import React from "react";
import styled from "styled-components";

const BaseTerminal = styled.pre`
  background-color: black;
  color: white;
  font-family: monospace;
  flex-grow: 1;
  margin-bottom: 2rem;
  padding: 1rem;
  font-size: 1rem;
`;

export default function Terminal({ onClick, children }) {
  return <BaseTerminal onClick={onClick}>{children}</BaseTerminal>;
}
