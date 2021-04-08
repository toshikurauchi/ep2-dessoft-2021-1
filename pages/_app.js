import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const theme = {
  colors: {
    primary: "#000000",
    secondary: "#8C8C8C",
    input: "#00ff00",
    red: "#E64A61",
    blue: "#6290D6",
    green: "#A8EA38",
    purple: "#B46BDA",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
