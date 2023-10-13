import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import MainRoutes from 'routes/MainRoutes';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <MainRoutes />
      </MainTemplate>
    </BrowserRouter>
  );
};

export default App;
