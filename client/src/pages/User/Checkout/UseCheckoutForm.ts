import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { actPlaceOrder } from "../../../store/order/orderSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actDeleteAllProduct } from "../../../store/cart/cartSlice";

import { useForm, SubmitHandler } from "react-hook-form"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";


type Inputs = {
    address: string
    city: string
    appartment: string
    district: string
}

export default function UseCheckoutForm() {

    const [loading, setLoading] = useState(false)
    const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false)

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const { cartProducts } = useAppSelector(state => state.cart)
    const stripe = useStripe();
    const elements = useElements();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded");
            return;
        }
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("CardElement not found");
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement as StripeCardElement,
        });
        if (error || !paymentMethod) {
            console.error("Payment Error:", error);
            alert("Payment failed!");
            return
        }
        dispatch(actPlaceOrder({ paymentMethodId: paymentMethod.id, amount: cartProducts?.totalPrice as number, Address: data })).unwrap()
            .then(() => {
                let cartProductIds: any = []
                let unSelectCartIds: any = []

                cartProducts?.cartProducts.map((el) => {
                    if (el.select === true) {
                        cartProductIds.push(el._id)
                    } else {
                        unSelectCartIds.push({
                            id: el._id,
                            quantity: el.quantity
                        })
                    }
                })
                const cartIds = {
                    cartProductIds,
                    unSelectCartIds
                }
                setOrderPlacedSuccess(true)
                dispatch(actDeleteAllProduct(cartIds))
                setLoading(false)
            }).catch((error) => {
                alert(error);
            })
        setLoading(false)
    }

    useEffect(() => {

        if ((cartProducts?.totalPrice === undefined || cartProducts?.totalPrice === 0) && orderPlacedSuccess === false) {
            navigation("/cart")
        }
    }, [])

  return {
      orderPlacedSuccess ,
      navigation,
      handleSubmit,
      onSubmit,
      register,
      cartProducts,
      CardElement,
      loading,
  }
}
