import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'views/Home/Home';
import AddReceipt from 'views/AddReceipt/AddReceipt';
import NotFound from 'views/NotFound/NotFound';
import { RouteEnum } from 'enums';

const MainRoutes = (): ReactElement => (
  <Routes>
    <Route path={RouteEnum.HOME} element={<Home />} />
    <Route path={RouteEnum.ADD_RECEIPT} element={<AddReceipt />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
