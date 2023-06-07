import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  h1,
  h2,
  h3
   {
    font-weight: 700;
  }
`

export default GlobalStyle;