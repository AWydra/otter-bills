import React from 'react';
import { Global, css } from '@emotion/react';

function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
        }

        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}
    />
  );
}

export default GlobalStyles;
