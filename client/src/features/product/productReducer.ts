import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import axios from 'axios'
 interface product{
    name:string,
    imgurl:string

}
export interface productState{
    productArr:Array<product>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState:productState={
    productArr:[],
    status:'idle'
}
export const getProductAsync = createAsyncThunk(
    'product/fetshProducts',
    async (_, thunkApi) => {
      try {
        const response = await axios.get('/product/get-products')
        const data = response.data
        return data
  
      }
      catch (err: any) {
        thunkApi.rejectWithValue(err.response.data)
      }
  
    }
  );
  export const getProductByTypeAsync = createAsyncThunk(
    'productType/fetshProductsType',
    async (type:string) => {
      try {
        const response = await axios.post('/product/get-products-by-type',{type:type})
        const data = response.data
        return data
  
      }
      catch (err: any) {
        console.log(err.message)
         }
  
    }
  );
  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
     
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductAsync.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(getProductAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.productArr = action.payload;
        })
     
        
    }
  });
export const getProduct = (state: RootState) => state.product;

export default productSlice.reducer;


