import { Link, useNavigate } from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { actGetProductById } from "../../../store/product/productSlice";
import { actAddToCart } from "../../../store/cart/cartSlice";
import { actAddToWishlist } from "../../../store/wishlist/wishlistSlice";
import { Start } from "../../common";

type Props = {
  products: {
    id: string,
    name: string,
    subCatagory_id: string,
    image: string,
    review: number,
    numCostomer: number,
    prices: any
  }
  authError: (data: boolean) => void
}


export default memo(function Product({ products, authError }: Props) {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector(state => state.auth)
  const { wishlistIds } = useAppSelector(state => state.wishlist)

  const islike = wishlistIds.includes(products.id) ? { color: "red" } : ""

  const [waiting, setWaiting] = useState(false)

  const animStyle: React.CSSProperties = waiting ? { pointerEvents: "none" } : {};

  const addToCartHandler = (productId: string) => {
    if (accessToken) {
      setWaiting(true)
      const data = {
        product_id: productId,
        productPrice_id: products.prices.typeValue._id
      }
      dispatch(actAddToCart(data))
      const func = setTimeout(() => {
        setWaiting(false)
      }, 1000)
      return () => { clearTimeout(func) }

    } else {
      authError(true)
    }
  }

  return (

    <>
      <li style={{ backgroundColor: "#eee", borderRadius: "24px", width: "300px", marginTop: "20px" }} >

        <figure>
          <a className="aa-product-img" style={{ height: "300px", ...animStyle }}

          >
            <img style={{ height: "300px", width: "100%", objectFit: "cover" }} src={products.image} alt="polo shirt img" />
          </a>
          <a className="aa-add-card-btn" style={{ ...animStyle }} onClick={() => { addToCartHandler(products.id) }}><span className="fa fa-shopping-cart"></span>
            {waiting ? "Add To Cart . . . " : "Add To Cart"}
          </a>
          <figcaption>
            <h4 style={{ display: "flex", justifyContent: "start", paddingLeft: "20px" }}><a href="#">{products.name}</a></h4>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>

              <Start review={products.review} />
              <div>
                <span className="aa-product-price">{products.prices.typeValue.price} $ </span>
              </div>
            </div>
          </figcaption>
        </figure>
        <div className="aa-product-hvr-content">
          <a onClick={() => { accessToken ? dispatch(actAddToWishlist(products.id)) : authError(true) }} data-toggle="tooltip" data-placement="top" title="Add to Wishlist">
            <span className="fa fa-heart" style={{ ...islike }}  ></span>
          </a>
          <Link onClick={() => { dispatch(actGetProductById(products.id)) }} to={"/productPage"} data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal">
            <span className="fa fa-search"></span>
          </Link>
        </div>
      </li >
    </>
  )
})
