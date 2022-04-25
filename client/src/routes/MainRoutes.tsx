import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'views/Home/Home';
import NotFound from 'views/NotFound/NotFound';

const MainRoutes = (): ReactElement => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
