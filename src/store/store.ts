import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/ProductSlice";
import ModalsReducer from "../features/Modals/ModalSlice"


export const store = configureStore({
  reducer: {
      products: ProductsReducer,
      modals: ModalsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;