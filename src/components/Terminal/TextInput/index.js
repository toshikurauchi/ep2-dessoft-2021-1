import React, { forwardRef } from "react";
import styled from "styled-components";

const BaseInput = styled.input`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.input};
  font-family: monospace;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

export default forwardRef(({ onEnter }, inputRef) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") onEnter(inputRef.current?.value);
  };
  return <BaseInput ref={inputRef} onKeyPress={handleKeyPress} type="text" />;
});
