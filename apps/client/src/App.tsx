import type { ReactElement } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import MainRoutes from 'routes/MainRoutes';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <MainTemplate>
        <MainRoutes />
      </MainTemplate>
    </BrowserRouter>
  );
}

export default App;
