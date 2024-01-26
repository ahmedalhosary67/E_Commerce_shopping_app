import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ProductTypes} from '../../services/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartState {
  cart: {
    items: ProductTypes[];
    total: number;
    amount: number;
  };
}

const initialState: CartState = {
  cart: {
    items: [],
    total: 0,
    amount: 0,
  },
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductTypes>) => {
      const findProduct: ProductTypes | undefined = state.cart.items.find(
        (item: ProductTypes) => item.id == action.payload.id,
      );

      findProduct
        ? (findProduct.amount += 1)
        : state.cart.items.push({...action.payload, amount: 1});

      AsyncStorage.setItem('cart-data', JSON.stringify(state));
    },
    handleIncrease: (state, action: PayloadAction<number>) => {
      state.cart.items.map((item: any) => {
        item.id == action.payload
          ? {...item, amount: (item.amount += 1)}
          : item;
      });
    },
    handleDecrease: (state, action: PayloadAction<number>) => {
      state.cart.items.map((item: any) => {
        item.id == action.payload
          ? {...item, amount: (item.amount -= 1)}
          : item;
      });
    },
    handleDelete: (state, action: PayloadAction<number>) => {
      state.cart.items = state.cart.items.filter(
        (item: any) => item.id !== action.payload,
      );
    },
    handleTotalCost: state => {
      console.log(state.cart.total);
      state.cart.total = 0;

      state.cart.items.map(
        (item: any) =>
          (state.cart.total +=
            Number(item.price.finalPrice) * Number(item.amount)),
      );
    },
  },
});

export const {
  addToCart,
  handleDecrease,
  handleIncrease,
  handleDelete,
  handleTotalCost,
} = CartSlice.actions;

export const CartProducts = (state: RootState) => state.cart.cart;
export default CartSlice.reducer;
