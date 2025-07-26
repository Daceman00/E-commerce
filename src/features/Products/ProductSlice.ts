import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./ProductTypes";
import {fetchProducts, createProduct} from "./ProductThunks"
 
const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
  createStatus: 'idle',
  createError: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  },

  extraReducers : (builder) => {
    builder
    //fetch
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

    builder
    //create
      .addCase(createProduct.pending, (state) => {
        state.createStatus = 'loading';
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) =>{
        state.createStatus = 'succeeded';
        state.error = null;
        state.products.push(action.payload)
        console.log(state.products)
      })
      .addCase(createProduct.rejected, (state, action) =>{
        state.createStatus = 'failed';
        state.error = action.payload || "Something went wrong"
      })
  },
});


export default productSlice.reducer;