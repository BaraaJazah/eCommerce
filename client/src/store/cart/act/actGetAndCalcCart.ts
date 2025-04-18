

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";


const actGetAndCalcCart = createAsyncThunk("/actGetAndCalcCart", async (_, { rejectWithValue, getState }) => {

    const { auth } = getState() as RootState
    try {
        const res = await axios.get("/api/cart/get", {
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

export default actGetAndCalcCart