import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

type TData = {
    id: string,
}

const actDeleteCartItem = createAsyncThunk("/actDeleteCartItem", async (data: TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.delete(`/api/cart/delete/${data}`, {
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

export default actDeleteCartItem