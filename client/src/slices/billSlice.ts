import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopOptionIterface, PayersInterface } from 'interfaces';

interface BillState {
  shop: ShopOptionIterface;
  amount: string;
  date: Date | number | string;
  payers: PayersInterface[];
}

interface ReceiptSplitInterface {
  id: number;
  splitsReceipt: boolean;
}

const initialState: BillState = {
  shop: {
    name: '',
    id: null,
  },
  amount: '',
  date: new Date().toString(),
  payers: [],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setShop: (state, action: PayloadAction<ShopOptionIterface>) => {
      state.shop = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setDate: (state, action: PayloadAction<Date | number | string>) => {
      state.date = action.payload;
    },
    setPayers: (state, action: PayloadAction<PayersInterface[]>) => {
      state.payers = action.payload;
    },
    setReceiptSplit: (state, action: PayloadAction<ReceiptSplitInterface>) => {
      state.payers = state.payers.map((payer) => {
        if (payer.id === action.payload.id) {
          return { ...payer, splitsReceipt: action.payload.splitsReceipt };
        }
        return payer;
      });
    },
  },
});

export const { setShop, setAmount, setDate, setPayers, setReceiptSplit } = billSlice.actions;

export default billSlice.reducer;
