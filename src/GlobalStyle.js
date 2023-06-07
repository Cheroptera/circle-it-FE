import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: 'Poppins', sans-serif;
  }

  h2 {
    font-weight: 600;
  }
`

export default GlobalStyle;