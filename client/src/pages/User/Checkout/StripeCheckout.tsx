import { Elements, } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY!);

export default function StripeCheckout() {

    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}


