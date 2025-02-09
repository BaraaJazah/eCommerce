import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

type TData = {
    page: number,
}
const actGetAllProduct = createAsyncThunk("/getAllProduct", async (data: TData, { rejectWithValue }) => {

    try {
        console.log(data)
        const res = await axios.get(`/api/product/get?page=${data.page}`)

        return res.data.products

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetAllProduct