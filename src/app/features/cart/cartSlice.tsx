import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  isOpen: boolean;
}

const initialState: CartState = {
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, toggleIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
