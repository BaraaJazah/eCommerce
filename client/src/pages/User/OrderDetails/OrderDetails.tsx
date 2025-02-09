import { useNavigate } from "react-router-dom"
import { Loading } from "../../../components/feedback"
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks"
import { actGetProductById } from "../../../store/product/productSlice"
import "./styles.css"

export default function OrderDetails() {
    const { error, loading, OneOrder } = useAppSelector(state => state.order)
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigation = useNavigate()

    const productHandeler = (id: string) => {
        dispatch(actGetProductById(id))
        navigation("/productPage")
    }

    return (
        <Loading loading={loading} error={error as string} >
            <div className="order-body">
                <div className="order-body-title">
                    <p>Thank You For Order, <span >{user?.name}</span>  </p>
                </div>
                <hr />
                <div className="order-body-orderData" >
                    <p>Receipt</p>
                    <p>Receipt Voucher : {OneOrder?._id}</p>
                </div>
                <hr />
                <div className="order-body-card-border">
                    {
                        OneOrder?.products.map((el, index) => (
                            <div key={index} className="order-body-card">
                                <img onClick={() => { productHandeler(el.id) }} src={el.image} alt="" />
                                <p>{el.name}</p>
                                <p>Price : {el.price.price}$</p>
                                <p>{el.price.detail.key}: {el.price.detail.value}</p>
                                <p>Qty: {el.qunatity}</p>
                                <p> Total :  {el.qunatity * el.price.price} $    </p>
                                <p className="order-body-card-status"> {OneOrder.status}    </p>
                            </div>
                        ))
                    }
                </div>
                <div className="order-body-footer">
                    <p>Total paid: <span>{OneOrder?.totalPrice}$</span></p>
                </div>
                {/* helloo */}




            </div>
        </Loading >

    )
}
