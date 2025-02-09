import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { actGetWishlistData } from "../../../store/wishlist/wishlistSlice";
import WishlistItems from "./WishlistItems/WishlistItems";
import { Loading } from "../../../components/feedback";
import Lottie from "lottie-react";
import lottie_NotFound from "../../../assets/LottieFile/AnimationNotFound.json"


export default function Wishlist() {
    const { wishlistProducts, loading, error } = useAppSelector(state => state.wishlist)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actGetWishlistData())
    }, [dispatch])
    return (
        <Loading loading={loading} error={error as string} PageName="Wishlist" >
            {
                wishlistProducts.length < 1 ?
                    <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} />
                    :
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
                                                                <th>Product</th>
                                                                <th>Price</th>
                                                                <th>Reviews</th>
                                                                <th></th>
                                                                <th></th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                wishlistProducts?.map((el, index) => (
                                                                    <WishlistItems key={index} el={el} />
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }



        </Loading>

    )
}
