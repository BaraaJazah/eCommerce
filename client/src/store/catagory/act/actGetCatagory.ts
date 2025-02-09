import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { TCatagory } from "../../../types/catagories.type";

const actGetCatagory = createAsyncThunk("/getCatagoryWithSub", async (_, { rejectWithValue }) => {

    try {
        const res = await axios.get("/api/catagory/getWithSub")
        if (res.data.Catagories?.length !== 0)
            return res.data.Catagories

    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actGetCatagory