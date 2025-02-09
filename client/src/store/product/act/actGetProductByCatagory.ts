
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actGetProductByCatagory = createAsyncThunk("/actGetProductByCatagory", async (data: string, { rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await axios.get(`/api/product/getByCatagory/${data}`)
        if (res.data.products) {

            return res.data.products
        }
        else {
            return fulfillWithValue([])
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }

    }
})

export default actGetProductByCatagory