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

const setStringValue = async (value: ProductTypes[]) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(value));
  } catch (e) {
    // save errorr
  }

  console.log('Done.');
};
export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('cart');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
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
      setStringValue(state.cart.items);
    },
    storageCartData: (state, action: PayloadAction<ProductTypes[]>) => {
      state.cart.items = action.payload;
    },
    handleIncrease: (state, action: PayloadAction<number>) => {
      state.cart.items.map((item: any) => {
        item.id == action.payload
          ? {...item, amount: (item.amount += 1)}
          : item;
      });
      setStringValue(state.cart.items);
    },
    handleDecrease: (state, action: PayloadAction<number>) => {
      state.cart.items.map((item: any) => {
        item.id == action.payload
          ? {...item, amount: (item.amount -= 1)}
          : item;
      });
      setStringValue(state.cart.items);
    },
    handleDelete: (state, action: PayloadAction<number>) => {
      state.cart.items = state.cart.items.filter(
        (item: any) => item.id !== action.payload,
      );
      setStringValue(state.cart.items);
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
  storageCartData,
} = CartSlice.actions;

export const CartProducts = (state: RootState) => state.cart.cart;
export default CartSlice.reducer;
