import { createAsyncThunk } from "@reduxjs/toolkit";
import type { NewProductItem, ProductItem } from "./ProductTypes";
import api, { getAxiosErrorMessage } from "../../helpers/api";

export const fetchProducts = createAsyncThunk<ProductItem[], void, {rejectValue: string}>(
    'products/fetchProduct',
    async (_, {rejectWithValue}) => {
        try{
            const {data} = await api.get<ProductItem[]>('/products')
            return data;
        }catch(err) {
            return rejectWithValue(getAxiosErrorMessage(err));
        }
    }
)

export const createProduct = createAsyncThunk<ProductItem, NewProductItem, {rejectValue: string}>(
    'products/createProduct',
    async (payload, {rejectWithValue}) =>{
        try {
            const {data} = await api.post<ProductItem>('/products', payload)
            return data
        } catch (err) {
            return rejectWithValue(getAxiosErrorMessage(err))
        }
    }
)