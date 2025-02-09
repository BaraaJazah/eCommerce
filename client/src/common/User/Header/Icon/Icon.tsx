import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hook/Hooks";
import { boolean } from "yup";

type Props = {
  IconName: "heart" | "cart"
  btnName: string
  Length?: number
  link: "cart" | "wishlist"
  authError: (data: boolean) => void
}

export default function Icon({ IconName, Length, btnName, link, authError }: Props) {
  const { accessToken } = useAppSelector(state => state.auth)
  const [makeAnim, setMakeAnim] = useState(false)
  const Icon = () => {
    if (IconName == "heart") {
      return <FaHeart />
    } else if (IconName === "cart") {
      return <FaShoppingCart />
    }
  }
  const animeStyle = makeAnim ? { fontSize: "16px" } : {};

  useEffect(() => {
    setMakeAnim(true)

    const func = setTimeout(() => {
      setMakeAnim(false)
    }, 300)

    return () => { clearTimeout(func) }
  }, [Length])

  return (
    <div className="aa-cartbox"  >

      <Link className="aa-cart-link" to={accessToken ? `/${link}` : ""} onClick={() => { !accessToken ? authError(true) : "" }} style={{ width: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
        {Icon()}
        <span className="aa-cart-title">{btnName}</span>
        {
          Length && Length > 0 ?
            <span className="aa-cart-notify" style={{ backgroundColor: "transparent", right: "34%", ...animeStyle }}>{Length}</span>
            : ""
        }
      </Link >
    </div>
  )
}

// { backgroundColor: "transparent", right: "34%", fontSize: "14px" }
