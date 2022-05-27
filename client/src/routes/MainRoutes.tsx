import React, { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'views/Home/Home';
import AddReceipt from 'views/AddReceipt/AddReceipt';
import NotFound from 'views/NotFound/NotFound';
import { RouteEnum } from 'enums';

const MainRoutes = (): ReactElement => (
  <Routes>
    <Route path={RouteEnum.HOME} element={<Home />} />
    <Route path={RouteEnum.ADD_RECEIPT_STEP} element={<AddReceipt />} />
    <Route path={RouteEnum.NOT_FOUND} element={<NotFound />} />
    <Route path="*" element={<Navigate to={RouteEnum.NOT_FOUND} replace />} />
  </Routes>
);

export default MainRoutes;
