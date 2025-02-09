import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { actGetProductByCatagory } from "../../../store/product/productSlice";
import { actAddToCart } from "../../../store/cart/cartSlice";


export default function UseProductPage() {

    const dispatch = useAppDispatch()
    const { oneProduct, products, loading, error } = useAppSelector(state => state.product)
    const { wishlistIds } = useAppSelector(state => state.wishlist)
    const { accessToken } = useAppSelector(state => state.auth)

    const [authError, setAuthError] = useState(false)
    const islike = wishlistIds.includes(oneProduct?.product._id as string) ? { color: "red" } : {}

    useEffect(() => {
        if (oneProduct)
            setPrice(oneProduct?.product.prices.typeValue[0]._id)
        dispatch(actGetProductByCatagory(oneProduct?.product.subCatagory_id as string))
    }, [dispatch, oneProduct])

    const [price, setPrice] = useState(oneProduct?.product.prices.typeValue[0]._id)

    const getPriceId = (data: string) => {
        setPrice(data);
    };

    const addToCartHandeler = (product_id: string) => {
        const data = {
            product_id: product_id,
            productPrice_id: price as string
        }
        dispatch(actAddToCart(data))
    }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },

        ]
    };


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


    return {
        loading,
        error,
        oneProduct,
        settings,
        islike,
        products,
        getPriceId,
        addToCartHandeler,
        dispatch,
        accessToken,
        authError,
        setAuthError,
        topPage,
        authErrorHandler
    }
}
