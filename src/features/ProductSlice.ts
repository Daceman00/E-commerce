import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialState: Product = {
  id: 1,
  name: "Product 1",
  price: 100,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  }
});


export default productSlice.reducer;