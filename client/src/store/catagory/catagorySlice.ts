import { createSlice } from '@reduxjs/toolkit'
import { ICatagoryState } from '../../types/catagories.type';
import actGetCatagory from "./act/actGetCatagory"


const initialState: ICatagoryState = {
    Catagories: [],
    loading: "idle",
    error: null
}

const catagorySlice = createSlice({
    name: 'catagory',
    initialState,
    reducers: {

    },

    extraReducers(building) {
        building
            .addCase(actGetCatagory.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetCatagory.fulfilled, (state, action) => {
                state.loading = "success"
                state.Catagories = action.payload
            })
            .addCase(actGetCatagory.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string")
                    state.error = action.payload

            })

    }

})
export const { } = catagorySlice.actions;
export { actGetCatagory };
export default catagorySlice.reducer