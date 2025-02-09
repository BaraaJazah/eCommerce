import { IoMdClose } from "react-icons/io";
import { actAddToWishlist } from "../../../../store/wishlist/wishlistSlice";
import { useAppDispatch } from "../../../../hook/Hooks";
import { actAddToCart } from "../../../../store/cart/cartSlice";
import { useState } from "react";


type Props = {
    el: {
        _id: string
        product_id: string
        product: {
            id: string;
            name: string;
            desc: string;
            review: number;
            numConstomer: number;
            love: number;
            isLiked?: boolean;
            images: string[]
            prices: {
                typeKey: string;
                typeValue: {
                    size: string;
                    price: number;
                    oldPrice: number;
                    quantity: number;
                    _id: string
                }[];
            };
        }
    }
}

export default function WishlistItems({ el }: Props) {
    const dispatch = useAppDispatch()


    const start = Math.floor(el.product.review as number);
    const HalfStart = el.product.review as number - start;
    const emptyStart = Math.floor(5 - (el.product.review as number))

    const [price, setPrice] = useState(el.product.prices.typeValue[0]._id)
    const addToCartHandeler = (product_id: string) => {
        const data = {
            product_id: product_id,
            productPrice_id: price
        }
        dispatch(actAddToCart(data))
    }
    return (
        <tr>
            <td>
                <a href="#" >
                    <img style={{ borderRadius: "50%", width: "100px" }} width={100} height={100} src={el.product.images[0]} alt="img" />
                </a>
            </td>
            <td><a className="aa-cart-title" href="#">{el.product.name}</a></td>
            <td>
                <div className="form-group" style={{ width: "75%", margin: 'auto' }}>
                    <label >{el.product.prices.typeKey}</label>
                    <select className="form-control" onChange={(e) => { setPrice(e.target.value) }} >
                        {
                            el.product.prices.typeValue.map((el, index) => (
                                <option key={index} value={el._id} >
                                    {el.size} : {el.price.toFixed(2)} $
                                </option>
                            ))
                        }
                    </select>
                </div>
            </td>
            <td>
                {
                    el.product.review !== 0.0 ?
                        <span className="ratings" >
                            <span>{el.product.review.toFixed(1)} </span>
                            {
                                Array(start | 0).fill(0).map((_, index) => (
                                    <i key={index} className="fa fa-star" style={{ color: "#fbc634" }}></i>
                                ))
                            }
                            {
                                HalfStart > 0 ?
                                    <i className="fa fa-star-half" style={{ color: "#fbc634" }}></i>
                                    : ""
                            }
                            {
                                Array(emptyStart | 0).fill(0).map((_, index) => (
                                    <i key={index} className="fa fa-star" ></i>
                                ))
                            }
                            {
                                el.product.numConstomer ? <span className="">  ( {el.product.numConstomer} )  </span> : ""
                            }

                            {/* Lenght of reviews */}
                        </span>
                        : ""

                }

            </td>
            <td><a onClick={() => { addToCartHandeler(el.product_id) }} className="aa-add-to-cart-btn">Add To Cart</a></td>
            <td><a className="remove" onClick={() => { dispatch(actAddToWishlist(el.product_id)) }}><IoMdClose /></a></td>

        </tr>

    )
}
