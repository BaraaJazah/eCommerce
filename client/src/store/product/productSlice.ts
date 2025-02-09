import { createSlice } from '@reduxjs/toolkit'
import { IProductState } from '../../types/product.type';
import actGetAllProduct from './act/actGetAllProduct';
import actGetProductByCatagory from './act/actGetProductByCatagory';
import actGetProductById from './act/actGetProductById';
import actSearchProduct from './act/actSearchProduct';


const initialState: IProductState = {
    products: [],
    oneProduct: null,
    loading: "idle",
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearOneProduct: (state) => {
            state.loading = "idle"
            state.error = null
            state.oneProduct = null
        },

        clearProducts: (state) => {
            state.loading = "idle"
            state.error = null
            state.products = []
        }
    },

    extraReducers(building) {
        building
            .addCase(actGetAllProduct.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetAllProduct.fulfilled, (state, action) => {
                state.loading = "success"
                state.products = [...state.products, ...action.payload];
            })
            .addCase(actGetAllProduct.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload

            })
            ///////////////////////////
            .addCase(actGetProductByCatagory.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetProductByCatagory.fulfilled, (state, action) => {
                state.loading = "success"
                state.products = action.payload
            })
            .addCase(actGetProductByCatagory.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload
            })
            /////////////////////////////////////////////////
            .addCase(actGetProductById.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetProductById.fulfilled, (state, action) => {
                state.loading = "success"
                state.oneProduct = action.payload
            })
            .addCase(actGetProductById.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload

            })

            /////////////////////// Search Product By Name //////////////////////////

            .addCase(actSearchProduct.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actSearchProduct.fulfilled, (state, action) => {
                state.loading = "success"
                state.products = action.payload.products
            })
            .addCase(actSearchProduct.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload

            })

    }

})
export const { clearOneProduct, clearProducts } = productSlice.actions;
export { actGetAllProduct, actGetProductByCatagory, actGetProductById, actSearchProduct };
export default productSlice.reducer