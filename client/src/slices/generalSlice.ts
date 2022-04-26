import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

type GeneralState = {
  mode: ThemeModeEnum;
};

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
