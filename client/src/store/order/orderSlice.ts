import { createSlice } from '@reduxjs/toolkit'
import { IOrderState } from '../../types/order.type'
import actPlaceOrder from './act/actPlaceOrder'
import actGetOrders from './act/actGetOrders'


const initialState: IOrderState = {
    OneOrder: null,
    Orders: [],
    loading: "idle",
    error: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrderById: (state, action) => {
            state.OneOrder = action.payload
        }
    },

    extraReducers(building) {
        building
            .addCase(actPlaceOrder.pending, (state) => {
                state.loading = "idle"
                state.error = null
            })
            .addCase(actPlaceOrder.fulfilled, (state) => {
                state.loading = "success"
            })
            .addCase(actPlaceOrder.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            ////////////////// act Get Orders  //////////////////////

            .addCase(actGetOrders.pending, (state) => {
                state.loading = "idle"
                state.error = null
            })
            .addCase(actGetOrders.fulfilled, (state, action) => {
                state.loading = "success"
                state.Orders = action.payload.orderProducts
            })
            .addCase(actGetOrders.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload
            })
    }

})
export const { getOrderById } = orderSlice.actions;
export { actPlaceOrder, actGetOrders };
export default orderSlice.reducer