import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import ProductsReducer from '../slice/productsSlice';
import ThemeReducer from '../slice/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    Content: ProductsReducer,
    theme: ThemeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
