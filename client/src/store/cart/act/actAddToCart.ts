import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";


type TData = {
    product_id: string,
    productPrice_id: string
}

const actAddToCart = createAsyncThunk("/actAddToCart", async (data: TData, { rejectWithValue, getState }) => {

    const { auth } = getState() as RootState
    try {
        const res = await axios.post("/api/cart/create", data, {
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

export default actAddToCart