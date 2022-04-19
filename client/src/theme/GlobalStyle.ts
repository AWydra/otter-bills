import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
