import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./ProductTypes";
import {fetchProducts} from "./ProductThunks"
 
const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  },

  extraReducers : (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) =>{
        state.status = 'succeeded';
        state.products = action.payload
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || "Something went wrong";
      })
  },
});


export default productSlice.reducer;