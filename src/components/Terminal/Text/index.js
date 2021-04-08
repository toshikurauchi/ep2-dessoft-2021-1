import React from "react";
import styled from "styled-components";

const BaseText = styled.span`
  color: ${(props) => props.theme.colors[props.color] || "white"};
`;

export default function Text({ color, children }) {
  if (color && color !== "white")
    return <BaseText color={color}>{children}</BaseText>;
  return <>{children}</>;
}
