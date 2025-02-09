import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../../../hook/Hooks";
import { actChangeQuantity, actDeleteCartItem, actUpdateSelect } from "../../../../store/cart/cartSlice";
import { memo } from "react";


type data = {
    el: {
        _id: string
        name: string
        desc: string
        select: boolean
        quantity: number
        product: {
            price: {
                typeKey: string
                typeValue: {
                    size: string
                    price: number
                    oldPrice: number
                    quantity: number
                }
            },
            name: string,
            desc: string,
            id: string
            images: []

        }
        productPriceDetials: {
            priceDetials: {
                size: string
                price: number
            }
            pricesTypeName: string
            totalProductPrice: number
        }
    } | any
}

export default memo(function CartItem({ el }: data) {
    const dispatch = useAppDispatch()

    const selectHandeler = (e: boolean) => {
        const data = {
            select: e,
            cartProduct_id: el._id
        }
        dispatch(actUpdateSelect(data))
    }


    const quantityHandeler = (e: string) => {
        const ope = e > el.quantity ? "+" : "-"
        const data = {
            ope: ope as "+" | "-",
            cartProduct_id: el._id
        }
        dispatch(actChangeQuantity(data))
    }

    return (
        <tr >
            <td>
                <input type="checkbox" checked={el.select} onChange={e => { selectHandeler(e.target.checked) }} />
            </td>
            <td>
                <a href="#" style={{ width: "100px", height: "100px" }} >
                    <img style={{ borderRadius: "50%", width: "100px" }} width={100} height={100} src={el.product.images[0]} alt="img" />
                </a>
            </td>
            <td><a className="aa-cart-title" href="#">{el.product.name}</a></td>
            <td>
                <p>{el.productPriceDetials.pricesTypeName} : {el.productPriceDetials.priceDetials.size}</p>
                {el.productPriceDetials.priceDetials.price.toFixed(2)} $
            </td>
            <td><input className="aa-cart-quantity" value={el.quantity} type="number" onChange={(e) => { quantityHandeler(e.target.value) }} /></td>

            <td>{el.productPriceDetials.totalProductPrice.toFixed(2)} $</td>
            <td><a className="remove" onClick={() => { dispatch(actDeleteCartItem(el._id)) }}><IoMdClose /></a></td>
        </tr >
    )
})
