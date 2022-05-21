import { configureStore } from '@reduxjs/toolkit';
import generalReducer from 'slices/generalSlice';
import billReducer from 'slices/billSlice';

const store = configureStore({
  reducer: {
    general: generalReducer,
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
