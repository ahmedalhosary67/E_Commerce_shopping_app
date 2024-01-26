import {createSlice} from '@reduxjs/toolkit';

// import Data from '../../services/data.json';
// import Categories from '../../services/categories.json';

export interface ProductsState {
  categories: object[];
  products: object[];
}

const initialState: ProductsState = {
  categories: [],
  products: [],
};

export const ProductsSlice = createSlice({
  name: 'Content',
  initialState,
  reducers: {},
});

export default ProductsSlice.reducer;
