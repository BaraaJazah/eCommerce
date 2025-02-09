import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../store";

type TData = {
    paymentMethodId: string,
    amount: number
    Address: {
        address: string
        city: string
        appartment: string
        district: string
    }
}
type TProducts = {
    id: string,
    name: string,
    desc: string
    qunatity: number
    image: string
    price: string,
}[]

const actPlaceOrder = createAsyncThunk("/placeOrder", async (data: TData, { rejectWithValue, getState }) => {
    try {
        const { auth, cart } = getState() as RootState
        if (!cart.cartProducts?.totalPrice)
            return rejectWithValue("There are no Items in Cart")
        let products: TProducts = [];
        cart.cartProducts?.cartProducts.map((el) => {
            if (el.select === true) {
                products.push({
                    id: el.product._id,
                    name: el.product.name,
                    desc: el.product.desc,
                    image: el.product.images[0],
                    qunatity: el.quantity,
                    price: el.productPrice_id
                })
            }
        })
        const lastData = {
            paymentMethodId: data.paymentMethodId,
            amount: data.amount,
            Address: {
                address: data.Address.address,
                city: data.Address.city,
                appartment: data.Address.appartment,
                district: data.Address.district,
            },
            cartProducts: products,
            totalPrice: cart.cartProducts?.totalPrice
        }
        const res = await axios.post("/api/order/payment", lastData, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        })
        return res.data


    } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
        }
    }
})

export default actPlaceOrder