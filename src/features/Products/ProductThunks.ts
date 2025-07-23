import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductItem } from "./ProductTypes";
import api, { getAxiosErrorMessage } from "../../helpers/api";

export const fetchProducts = createAsyncThunk<ProductItem[], void, {rejectValue: string}>(
    'products/fetchProductsAxios',
    async (_, {rejectWithValue}) => {
        try{
            const {data} = await api.get<ProductItem[]>('/products')
            return data;
        }catch(err) {
            return rejectWithValue(getAxiosErrorMessage(err));
        }
    }
)