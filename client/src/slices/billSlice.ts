import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageListType } from 'react-images-uploading';
import { ShopOptionIterface, PayersInterface } from 'interfaces';

interface BillState {
  shop: ShopOptionIterface;
  amount: string;
  date: Date | number | string;
  description: string;
  images: ImageListType;
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
  description: '',
  images: [],
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
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImages: (state, action: PayloadAction<ImageListType>) => {
      state.images = action.payload;
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

export const {
  setShop,
  setAmount,
  setDate,
  setDescription,
  setPayers,
  setImages,
  setReceiptSplit,
} = billSlice.actions;

export default billSlice.reducer;
