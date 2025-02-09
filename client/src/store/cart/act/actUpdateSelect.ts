import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

type TData = {
    select: boolean,
    cartProduct_id: string
};

const actUpdateSelect = createAsyncThunk("/actUpdateSelect", async (data: TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.put(`/api/cart/updateSelect/${data.cartProduct_id}`, { select: data.select }, {
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

export default actUpdateSelect