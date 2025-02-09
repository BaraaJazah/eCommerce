import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

type TData = {
    cartProductIds: string[],
    unSelectCartIds: string[],
}

const actDeleteAllProduct = createAsyncThunk("/actDeleteAllProduct", async (data: TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.post(`/api/cart/deleteAllCard`, { cartIds: data }, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        })
        if (res)
            return res.data

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actDeleteAllProduct