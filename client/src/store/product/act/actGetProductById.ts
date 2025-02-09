import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actGetProductById = createAsyncThunk("/getProductById", async (data: string, { rejectWithValue }) => {

    try {
        const res = await axios.get(`/api/product/get/${data}`)
        return res.data

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetProductById