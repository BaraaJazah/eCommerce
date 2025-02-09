import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

type TData = {
    ope: "-" | "+"
    cartProduct_id: string
};

const actChangeQuantity = createAsyncThunk("/actChangeQuantity", async (data: TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const res = await axios.put(`/api/cart/updateQuan/${data.cartProduct_id}`, { ope: data.ope }, {
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

export default actChangeQuantity