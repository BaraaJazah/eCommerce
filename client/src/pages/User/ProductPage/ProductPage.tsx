import { BsFillHeartFill } from "react-icons/bs";
import Slider from "react-slick";

// css slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { actAddToWishlist } from "../../../store/wishlist/wishlistSlice";
import Product from "../../../components/eCom/Product/Product";
import { Reviews, Description, Image, Pricing } from "./index"
import { Start } from "../../../components/common";
import { Loading } from "../../../components/feedback";
import UseProductPage from "./UseProductPage";


export default function ProductPage() {
    const {
        loading,
        error,
        oneProduct,
        getPriceId,
        addToCartHandeler,
        settings,
        islike,
        products,
        dispatch,
        accessToken,
        authError,
        setAuthError,
        topPage,
        authErrorHandler
    } = UseProductPage()


    return (
        <Loading loading={loading} error={error as string} >

            {
                authError ?
                    <div style={{ width: "50%", margin: "auto", marginTop: "15px" }} ref={topPage} >
                        <div className="alert alert-danger">
                            <a href="#" onClick={() => { setAuthError(false) }} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Error!</strong> Please Log In First
                        </div>
                    </div>
                    :
                    ""
            }
            <section id="aa-product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-product-details-area">
                                <div className="aa-product-details-content">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-5 col-xs-12">
                                            <div className="aa-product-view-slider">
                                                <Image Images={oneProduct?.product.images} />
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-7 col-xs-12">
                                            <div className="aa-product-view-content">
                                                <h3>{oneProduct?.product.name}</h3>
                                                <p>{oneProduct?.product.desc} </p>
                                                <Pricing prices={oneProduct?.product.prices} returnPrice={getPriceId} />

                                                <div style={{ display: "flex", justifyContent: "space-between", margin: "0 10px" }}>
                                                    <Start review={oneProduct?.product.review as number} numConstomer={oneProduct?.product.numConstomer} />
                                                    {
                                                        oneProduct?.product.love !== 0 ?
                                                            <span style={{ display: "flex", alignItems: "center" }}>
                                                                <BsFillHeartFill onClick={() => { dispatch(actAddToWishlist(oneProduct?.product._id as string)) }}
                                                                    style={{ margin: "0 5px ", ...islike }} size={20} /> ( {oneProduct?.product.love} )
                                                            </span>
                                                            : ""
                                                    }
                                                </div>
                                                <div className="aa-prod-view-bottom">
                                                    <a onClick={() => { accessToken ? addToCartHandeler(oneProduct?.product._id as string) : setAuthError(true) }} className="aa-add-to-cart-btn" >Add To Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="aa-product-details-bottom">
                                    <ul className="nav nav-tabs" id="myTab2">
                                        <li><a href="#description" data-toggle="tab">Description</a></li>
                                        <li><a href="#review" data-toggle="tab">Reviews</a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <Description Description={oneProduct?.product.details} />
                                        <Reviews Review={oneProduct?.reviewsProduct} />
                                    </div>
                                </div>
                                <div className="aa-product-related-item">
                                    <h3>Related Products</h3>
                                    <div className="col-md-12 " style={{ margin: "30px 0 ", }} >
                                        <div className="row" style={{ margin: "auto" }} >
                                            <ul className="aa-product-catg" style={{
                                                margin: "auto",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                justifyContent: "center"
                                            }}>
                                                <div className="slider-container"
                                                    style={{ width: "100%" }}>
                                                    <Slider {...settings} >
                                                        {products?.map((el, index) => (
                                                            oneProduct?.product._id !== el.id ?
                                                                <Product key={index} products={el} authError={authErrorHandler} />
                                                                : null
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </ul>
                                        </div>
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
