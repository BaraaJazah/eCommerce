import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { TLogin } from "../../../types/auth.type";

const actLogin = createAsyncThunk("/login", async (data: TLogin, { rejectWithValue }) => {

    try {
        const res = await axios.post("/api/auth/login", data)
        if (res) return res.data

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actLogin