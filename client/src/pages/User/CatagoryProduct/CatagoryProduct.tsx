import { useEffect, useRef, useState } from "react"
import Product from "../../../components/eCom/Product/Product"
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks"
import { actGetAllProduct } from "../../../store/product/productSlice"
import { Loading } from "../../../components/feedback"
import lottie_NotFound from "../../../assets/LottieFile/AnimationNotFound.json"
import Lottie from "lottie-react"

const CatagoryProduct = () => {
    const dispatch = useAppDispatch()
    const { products, loading, error } = useAppSelector(state => state.product)
    const [authError, setAuthError] = useState(false)
    const topPage = useRef<HTMLDivElement | null>(null); // Explicitly define type

    const authErrorHandler = () => {
        setAuthError(true);
        topPage.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
    useEffect(() => {
        if (authError === true)
            authErrorHandler()
    }, [authError])


    useEffect(() => {
        if (products.length === 0) {
            dispatch(actGetAllProduct({ page: 1 }));
        }
    }, [dispatch])

    return (
        <>
            <Loading loading={loading} error={error} >
                {
                    authError ?
                        <div style={{ width: "50%", margin: "auto", marginTop: "15px" }} ref={topPage}>
                            <div className="alert alert-danger">
                                <a href="#" onClick={() => { setAuthError(false) }} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                <strong>Error!</strong> Please Log In First
                            </div>
                        </div>
                        :
                        ""
                }
                <div className="col-md-12 " style={{ margin: "30px 0 ", }} >
                    <div className="row" style={{ margin: "auto" }} >
                        <ul className="aa-product-catg" style={{
                            margin: "auto",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}>
                            {products.length === 0 ? <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} /> : ""}
                            {
                                products?.map((el, index) => (
                                    <Product key={index} products={el} authError={authErrorHandler} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Loading>
        </>
    )
}

export default CatagoryProduct
