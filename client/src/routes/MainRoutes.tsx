import React, { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'views/Home/Home';
import AddReceipt from 'views/AddReceipt/AddReceipt';
import Balance from 'views/Balance/Balance';
import Payment from 'views/Payment/Payment';
import History from 'views/History/History';
import Login from 'views/Login/Login';
import NotFound from 'views/NotFound/NotFound';
import { RouteEnum } from 'enums';

const MainRoutes = (): ReactElement => (
  <Routes>
    <Route path={RouteEnum.HOME} element={<Home />} />
    <Route path={RouteEnum.ADD_RECEIPT_STEP} element={<AddReceipt />} />
    <Route path={RouteEnum.BALANCE} element={<Balance />} />
    <Route path={RouteEnum.PAYMENT} element={<Payment />} />
    <Route path={RouteEnum.HISTORY} element={<History />} />
    <Route path={RouteEnum.LOGIN} element={<Login />} />
    <Route path={RouteEnum.NOT_FOUND} element={<NotFound />} />
    <Route path="*" element={<Navigate to={RouteEnum.NOT_FOUND} replace />} />
  </Routes>
);

export default MainRoutes;
