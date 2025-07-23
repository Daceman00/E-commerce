import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/ProductSlice";


export const store = configureStore({
  reducer: {products: ProductsReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;