import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../../pages/ProductsPage";

// TODO: add types for cart items
export interface CartItem {
  id: number;
}

export interface CartState {
  isOpen: boolean;
  cartItems: ProductType[];
  numberOfItems: number;
}

const initialState: CartState = {
  isOpen: false,
  cartItems: [],
  numberOfItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      state.numberOfItems += 1;
      // check if item is already in cart
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        // if item is already in cart, increase quantity
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        );
        return;
      }
      // if item is not in cart, add it
      state.cartItems.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      state.numberOfItems -= 1;
      // check if item is already in cart
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      // if item is already in cart and quantity is 1, remove it
      if (itemInCart && itemInCart.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        return;
      }

      // if item is already in cart and quantity is more than 1, decrease quantity
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      );
    },
    incrementQuantity: (state, action: PayloadAction<ProductType>) => {
      state.numberOfItems += 1;
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity! + 1 }
          : item
      );
    },
    decrementQuantity: (state, action: PayloadAction<ProductType>) => {
      state.numberOfItems -= 1;
      // find item in cart
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      // if item is already in cart and quantity is 1, remove it
      if (itemInCart && itemInCart.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        return;
      }
      // if item is already in cart and quantity is more than 1, decrease quantity
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      );
    },
    clearCart: (state) => {
      state.numberOfItems = 0;
      state.cartItems = [];
    },
  },
});

export const {
  toggleIsOpen,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
