import { createSlice } from '@reduxjs/toolkit'
import { IWishlistState } from '../../types/wishlist.type';
import actAddToWishlist from './act/actAddToWishlist';
import actGetWishlistData from './act/actGetWishlistData';


const initialState: IWishlistState = {
    wishlistProducts: [],
    wishlistIds: [],
    loading: "idle",
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlistIds = []
            state.wishlistProducts = []
            state.loading = "idle"
            state.error = null
        }
    },

    extraReducers(building) {
        building
            //////////////////// Add To Wishlist   ////////////////////////

            .addCase(actAddToWishlist.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actAddToWishlist.fulfilled, (state, action) => {
                state.loading = 'success'
                if (!state.wishlistIds.includes(action.payload.id)) {
                    state.wishlistIds.push(action.payload.id)
                } else {
                    state.wishlistIds = state.wishlistIds.filter(id => id !== action.payload.id);

                    let array: any = []
                    state.wishlistProducts.forEach(el => {
                        if (el.product_id !== action.payload.id) {
                            array.push(el)
                        }
                    });
                    state.wishlistProducts = array
                }

            })
            .addCase(actAddToWishlist.rejected, (state, action) => {
                state.loading = 'failed'
                if (typeof action.payload === "string")
                    state.error = action.payload
            })

            ////////////////////  Get Wishlist Data   ////////////////////////

            .addCase(actGetWishlistData.pending, (state) => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(actGetWishlistData.fulfilled, (state, action) => {
                state.loading = 'success'
                state.wishlistIds = []
                state.wishlistProducts = action.payload.wishListProducts
                state.wishlistProducts.forEach(el => {
                    state.wishlistIds.push(el.product_id)
                });
            })
            .addCase(actGetWishlistData.rejected, (state, action) => {
                state.loading = 'failed'
                if (action.payload === "There Is No Products Wishlist") {
                    state.wishlistProducts = []
                    state.wishlistIds = []
                }
                if (typeof action.payload === "string")
                    state.error = action.payload
            })


    }

})
export const { clearWishlist } = wishlistSlice.actions;
export { actAddToWishlist, actGetWishlistData };
export default wishlistSlice.reducer