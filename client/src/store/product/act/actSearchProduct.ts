import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

type Tdata = {
    name: string
}
const actSearchProduct = createAsyncThunk("/actSearchProduct", async (data: Tdata, { rejectWithValue }) => {
    try {
        const res = await axios.post("/api/product/search", data)
        return res.data


    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actSearchProduct