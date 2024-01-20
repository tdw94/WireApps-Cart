import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {cloneDeep} from 'lodash';
import {CartItem, RemoveCartPayload} from '../../constants/types';

export interface CartState {
  cartProducts: CartItem[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const clonedProducts = cloneDeep(state.cartProducts);
      // check for existing cart item with product id and size
      const existingItem = clonedProducts.find(
        cp =>
          cp.item.id === action.payload.item.id &&
          cp.itemData.size === action.payload.itemData.size,
      );

      // if found, add/increase product count
      if (existingItem) {
        existingItem.itemData.count += action.payload.itemData.count;
        // remove current product from the array
        const cartWithoutExisting = clonedProducts.filter(
          cp =>
            cp.item.id !== action.payload.item.id ||
            cp.itemData.size !== action.payload.itemData.size,
        );
        // add modified product to the array
        cartWithoutExisting.push(existingItem);
        state.cartProducts = cartWithoutExisting;
      } else {
        // else, add product to cart
        clonedProducts.push({
          item: action.payload.item,
          itemData: action.payload.itemData,
        });
        state.cartProducts = clonedProducts;
      }
    },
    removeFromCart: (state, action: PayloadAction<RemoveCartPayload>) => {
      const clonedProducts = cloneDeep(state.cartProducts);
      state.cartProducts = clonedProducts.filter(
        cp =>
          !(
            cp.item.id === action.payload.item.id ||
            cp.itemData.size === action.payload.size
          ),
      );
    },
    emptyCart: state => {
      state.cartProducts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;
