import { useEffect } from "react";
import { actGetOrders, getOrderById } from "../../../store/order/orderSlice";

import { Loading } from "../../../components/feedback";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { MdNavigateNext } from "react-icons/md";

import styles from "./styles.module.css"
import { Link } from "react-router-dom";

const { orderCarts, orderCart, orderCartLeftPart, orderCartRightPart,
    leftPartImages, leftPartNumProduct, OrderContainer, OrderContainer_p
} = styles

export default function Order() {

    const dispatch = useAppDispatch()
    const { error, loading, Orders } = useAppSelector(state => state.order)



    useEffect(() => {
        dispatch(actGetOrders())
    }, [dispatch])

    return (
        <Loading loading={loading} error={error as string} >
            <div className={OrderContainer}>
                <p className={OrderContainer_p}>
                    My Orders</p>
                <div className={orderCarts} >
                    {
                        Orders.map((el, index) => (
                            <div key={index} className={orderCart}>
                                <div className={orderCartLeftPart}>
                                    <p > {el.createdAt.slice(0, 16).replace("T", " ")} </p>
                                    <p > Toplam Price : <span style={{ color: "#FF6666" }}>{el.totalPrice}$</span> </p>
                                    <div className={leftPartImages}>
                                        {el.products.map((ele, index) => (
                                            <img key={index} src={ele.image} alt="product Image" />

                                        ))}
                                    </div>
                                    <p className={leftPartNumProduct}>
                                        {el.products.length} Product
                                    </p>
                                </div>
                                <div className={orderCartRightPart} >
                                    <Link to={'/orderDetails'} onClick={() => { dispatch(getOrderById(el)) }}  >
                                        Details
                                        <MdNavigateNext />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }




                    {/* <div className={orderCart}> hello</div> */}


                </div>
            </div>
        </Loading>
    )
}
