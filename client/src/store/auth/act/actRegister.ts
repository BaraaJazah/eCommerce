import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TRegister } from "../../../types/auth.type";
import { isAxiosError } from "axios";


const actRegister = createAsyncThunk("/register", async (data: TRegister, { rejectWithValue }) => {
    try {
        const res = await axios.post("/api/auth/register", data)
        if (res.data) return res.data.user

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || "An unexpected error")
        }
    }
})

export default actRegister