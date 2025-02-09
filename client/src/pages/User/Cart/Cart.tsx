import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { actGetAndCalcCart } from "../../../store/cart/cartSlice";
import CartItem from "./CartItem/CartItem";
import { Loading } from "../../../components/feedback";
import { Link } from "react-router-dom";


export default function Cart() {

    const dispatch = useAppDispatch()
    const { cartProducts, loading, error } = useAppSelector(state => state.cart)
    useEffect(() => {
        dispatch(actGetAndCalcCart())
    }, [dispatch])

    return (

        <Loading loading={loading} error={error as string} PageName="Cart" >
            <section id="cart-view">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cart-view-area">
                                <div className="cart-view-table" style={{ marginBottom: "50px" }}>
                                    <form action="">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th></th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartProducts?.cartProducts.map((el, index) => (
                                                            <CartItem key={index} el={el} />
                                                        ))
                                                    }
                                                    <tr>
                                                        <td colSpan={7} >
                                                            {
                                                                cartProducts !== null ?
                                                                    < p style={{ padding: "20px" }}>Total Price : <span style={{ color: "red" }}>{cartProducts?.totalPrice.toFixed(2)}$ </span> </p>
                                                                    :
                                                                    < p style={{ padding: "20px" }}>No Products In Cart </p>
                                                            }
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                    <div className="cart-view-total">
                                        {
                                            cartProducts !== null ?
                                                <Link to="/checkout" style={cartProducts.totalPrice === 0 ? { pointerEvents: "none", backgroundColor: "gray" } : {}} className="aa-cart-view-btn" >
                                                    <p style={{ marginTop: "10px" }}> Checkout </p>
                                                </Link>
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Loading >


    )
}
