import { createSlice } from '@reduxjs/toolkit'
import { ICartState } from '../../types/cart.type';
import actAddToCart from './act/actAddToCart';
import actGetAndCalcCart from './act/actGetAndCalcCart';
import actGetCartDataWhenLogin from './act/actGetCartDataWhenLogin';
import actDeleteCartItem from './act/actDeleteCartItem';
import actUpdateSelect from './act/actUpdateSelect';
import actChangeQuantity from './act/actChangeQuantity';
import actDeleteAllProduct from './act/actDeleteAllProduct';


const initialState: ICartState = {
    cartProducts: null,
    cartIds: {},
    loading: "idle",
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartIds = {}
            state.cartProducts = null
            state.loading = "idle"
            state.error = null
        },

    },

    extraReducers(building) {
        building

            //////////////////// Add Quantity   ////////////////////////

            .addCase(actAddToCart.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actAddToCart.fulfilled, (state, action) => {
                state.loading = 'success'
                if (state.cartIds[action.payload.id]) {
                    state.cartIds[action.payload.id] = action.payload.quantity;
                } else {
                    state.cartIds[action.payload.id] = action.payload.quantity;
                }
            })
            .addCase(actAddToCart.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            //////////////////// Get And Calc Cart Data  ////////////////////////

            .addCase(actGetAndCalcCart.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actGetAndCalcCart.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartProducts = action.payload.cartPlusTotalPrice
            })
            .addCase(actGetAndCalcCart.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            //////////////////// Full Cart When Login ////////////////////////

            .addCase(actGetCartDataWhenLogin.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actGetCartDataWhenLogin.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartIds = {}
                for (let index = 0; index < action.payload.data.length; index++) {
                    state.cartIds[action.payload.data[index].id] = action.payload.data[index].quantity;
                }
            })
            .addCase(actGetCartDataWhenLogin.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            //////////////////// Delete Item From Cart ////////////////////////

            .addCase(actDeleteCartItem.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actDeleteCartItem.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartIds = {}
                for (let index = 0; index < action.payload.cartPlusTotalPrice.cartProducts.length; index++) {
                    state.cartIds[action.payload.cartPlusTotalPrice.cartProducts[index]._id] =
                        action.payload.cartPlusTotalPrice.cartProducts[index].quantity
                }
                state.cartProducts = action.payload.cartPlusTotalPrice
            })
            .addCase(actDeleteCartItem.rejected, (state, action) => {
                state.loading = 'failed'
                if (action.payload === "There Is No Products In Cart") {
                    state.cartIds = {}
                    state.cartProducts = null
                }
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            //////////////////// Update Select Cart ////////////////////////

            .addCase(actUpdateSelect.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actUpdateSelect.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartProducts = action.payload.cartPlusTotalPrice
            })
            .addCase(actUpdateSelect.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })


            //////////////////// Chnage Quantity ////////////////////////

            .addCase(actChangeQuantity.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actChangeQuantity.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartIds = {}
                for (let index = 0; index < action.payload.cartPlusTotalPrice.cartProducts.length; index++) {
                    state.cartIds[action.payload.cartPlusTotalPrice.cartProducts[index]._id] =
                        action.payload.cartPlusTotalPrice.cartProducts[index].quantity
                }
                state.cartProducts = action.payload.cartPlusTotalPrice
            })
            .addCase(actChangeQuantity.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            //////////////////// Chnage Quantity ////////////////////////

            .addCase(actDeleteAllProduct.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actDeleteAllProduct.fulfilled, (state, action) => {
                state.loading = 'success'
                state.cartIds = {}
                action.payload.unSelectCartIds.forEach((el: any) => {
                    state.cartIds[el.id] = el.quantity
                });
                state.cartProducts = null
            })
            .addCase(actDeleteAllProduct.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

    }

})
export const { clearCart } = cartSlice.actions;
export { actAddToCart, actGetAndCalcCart, actGetCartDataWhenLogin, actDeleteCartItem, actUpdateSelect, actChangeQuantity, actDeleteAllProduct };
export default cartSlice.reducer
