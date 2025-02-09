import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";


type TData = string

const actAddToWishlist = createAsyncThunk("/actAddToWishlist", async (data: TData, { rejectWithValue, getState }) => {

    const { auth } = getState() as RootState
    try {
        const res = await axios.post("/api/wishlist/create", { product_id: data }, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        })
        if (res) {
            return res.data
        }

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actAddToWishlist