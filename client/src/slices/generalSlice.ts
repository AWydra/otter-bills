import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeModeEnum } from 'enums';

interface GeneralState {
  mode: ThemeModeEnum;
}

const initialState: GeneralState = {
  mode: ThemeModeEnum.LIGHT,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      if (state.mode === ThemeModeEnum.LIGHT) {
        state.mode = ThemeModeEnum.DARK;
      } else {
        state.mode = ThemeModeEnum.LIGHT;
      }
    },
  },
});

export const { setMode, toggleMode } = generalSlice.actions;

export default generalSlice.reducer;
