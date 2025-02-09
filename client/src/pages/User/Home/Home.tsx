import { useEffect, useRef, useState } from "react"
import Product from "../../../components/eCom/Product/Product"
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks"
import { actGetAllProduct, clearProducts } from "../../../store/product/productSlice"
import InfiniteScroll from "react-infinite-scroll-component"
import Lottie from "lottie-react"
import lottie_NotFound from "../../../assets/LottieFile/AnimationNotFound.json"

import "./styles.css"

import { Loading } from "../../../components/feedback"
const Home = () => {
    const dispatch = useAppDispatch()
    const { products, loading, error } = useAppSelector(state => state.product)
    const { Catagories } = useAppSelector(state => state.catagory)

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


    const [page, setPage] = useState(1);
    const [maxMinFilter, setMaxMinFilter] = useState({ min: "0", max: "500" });
    const [hasMore, setHasMore] = useState(true);

    const getProductData = async () => {
        try {
            const result = await dispatch(actGetAllProduct({ page: page })).unwrap();
            if (result?.length > 0) {
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setHasMore(false);
        }
    }
    useEffect(() => {
        dispatch(clearProducts());
        setPage(1);
        setHasMore(true);
        getProductData();
    }, [dispatch]);

    return (
        <>
            <Loading loading={loading}  >
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
                < div className="col-md-1 " style={{ margin: "auto", }} >
                </div>
                < div className="col-md-10" style={{ margin: "auto", }} >
                    <div className=" row" style={{ margin: "30px 0 ", }} >

                        <div className="row" style={{
                            margin: "auto",
                        }} >
                            {products.length === 0 ? <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} /> : ""}

                            <InfiniteScroll
                                dataLength={products.length}
                                next={getProductData}
                                hasMore={hasMore}
                                scrollThreshold={0.8}
                                loader={
                                    <p style={{ textAlign: 'center' }}>
                                        <h4>Loading...</h4>
                                    </p>
                                }
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <ul className="aa-product-catg" style={{
                                    margin: "auto",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",

                                }}>

                                    {
                                        products?.map((el, index) => (
                                            <Product key={index} products={el} authError={authErrorHandler} />
                                        ))
                                    }
                                </ul>
                            </InfiniteScroll>
                        </div>
                    </div>


                </div>
            </Loading >
        </>
    )
}

export default Home










// < div className = "col-md-12 " style = {{ margin: "30px 0 ", }} >
//     <div className="row" style={{ margin: "auto" }} >
//         <ul className="aa-product-catg" style={{
//             margin: "auto",
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center"
//         }}>
//             {products.length === 0 ? <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} /> : ""}
//             {
//                 products?.map((el, index) => (
//                     <Product key={index} products={el} authError={authErrorHandler} />
//                 ))
//             }
//         </ul>
//     </div>
//             </div >
