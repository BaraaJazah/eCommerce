import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

const actGetOrders = createAsyncThunk("/actGetOrders", async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState() as RootState

        const res = await axios.get("/api/order/get", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        })
        return res.data

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetOrders