import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { BrowserRouter } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import MainRoutes from 'routes/MainRoutes';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <MainRoutes />
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
