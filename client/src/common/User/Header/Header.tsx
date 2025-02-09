import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks"
import { logoutAuth } from "../../../store/auth/AuthSlice"
import { actGetCatagory } from "../../../store/catagory/catagorySlice"
import { actSearchProduct } from "../../../store/product/productSlice"
import { clearWishlist } from "../../../store/wishlist/wishlistSlice"
import { clearCart } from "../../../store/cart/cartSlice"


import { Link, useNavigate } from "react-router-dom"
import Icon from "./Icon/Icon"
import Links from "./Links/Links"
import { Dropdown } from "react-bootstrap"

type Inputs = {
    name: string
}
export default function Header() {
    const {
        register,
        handleSubmit,
        watch
    } = useForm<Inputs>({
        mode: "onChange"
    })
    const nameValue = watch("name"); // مراقبة القيمة أثناء الكتابة

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (nameValue)
            dispatch(actSearchProduct(data))

    }

    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const { accessToken, user } = useAppSelector(state => state.auth)
    const { Catagories } = useAppSelector(state => state.catagory)
    const { cartIds } = useAppSelector(state => state.cart)
    const { wishlistIds } = useAppSelector(state => state.wishlist)
    const sumCartIds = Object.values(cartIds).reduce((acc, curr) => acc + curr, 0);
    const sumWishlistIds = wishlistIds.length
    const [authError, setAuthError] = useState(false)

    useEffect(() => {
        if (Catagories?.length === 0) {
            dispatch(actGetCatagory())
        }
    }, [dispatch])

    useEffect(() => {
        if (nameValue) {
            dispatch(actSearchProduct({ name: nameValue }))
        }
    }, [nameValue]);

    const logoutHandler = () => {
        dispatch(logoutAuth())
        dispatch(clearWishlist())
        dispatch(clearCart())
        navigation("/")
    }

    return (
        <>
            <div style={{ display: "flex", marginTop: "10px", alignItems: "center", flexDirection: "column" }}>
                <header id="aa-header">
                    <div className="aa-header-top">
                        <div className="container">
                            <div className="aa-header-top-right">
                                <ul className="aa-head-top-nav-right">
                                    {
                                        accessToken ?
                                            <>
                                                <li><Link to={"/orders"} >Orders</Link></li>
                                                <li>
                                                    <Dropdown className="d-inline mx-2" >
                                                        <Dropdown.Toggle style={{ backgroundColor: "transparent", color: "red", border: "none", outline: "none", padding: "10px 15px", fontSize: "15px" }} variant="success" id="dropdown-basic" >
                                                            Welcome <span style={{ textTransform: "capitalize", color: "#262626" }}> {user?.name}  {user?.surname} </span>
                                                            <span className="caret"></span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu  >
                                                            <Dropdown.Item href="#/action-1" style={{ color: "#FF6666", display: "flex", padding: "10px" }} >My Account </Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2" style={{ color: "#FF6666", display: "flex", padding: "10px" }} >My Address </Dropdown.Item>
                                                            <Dropdown.Divider style={{ margin: 0 }} />
                                                            <Dropdown.Item onClick={logoutHandler} style={{ color: "#FF6666", display: "flex", padding: "10px" }} >Logout</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li><Link to={"/login"} >Login</Link></li>
                                                <li><Link to={"/register"}>Register</Link></li>
                                            </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="aa-header-bottom ">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="aa-header-bottom-area">
                                        <div className="aa-logo">
                                            <a >
                                                <span className="fa fa-shopping-cart"></span>
                                                <p>Bj <strong>Store</strong> <span>Your Shopping Partner</span></p>
                                            </a>
                                        </div>
                                        <div >
                                            <Icon btnName="Wishlist" IconName="heart" Length={sumWishlistIds} link="wishlist" authError={setAuthError} />
                                            <Icon btnName="My Cart" IconName="cart" Length={sumCartIds} link="cart" authError={setAuthError} />
                                        </div>
                                        <div className="aa-search-box" style={{ marginTop: 0 }} >
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input type="text"  {...register("name")} id="" style={{ outline: "none" }} placeholder="Search here ... " />
                                                <button type="submit"><span className="fa fa-search"></span></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section id="menu" >
                        <div className="container">
                            <div className="menu-area">
                                <div className="navbar navbar-default" role="navigation">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>

                                    <div className="navbar-collapse collapse">
                                        <ul className="nav navbar-nav"  >
                                            <li><Link to={"/"}>Home</Link></li>
                                            {
                                                Catagories?.map((el, index) => {
                                                    return <Links key={index} catagory={el} />
                                                })
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </header>
            </div>
            {
                authError ?
                    <div style={{ width: "50%", margin: "auto", marginTop: "15px", }}>
                        <div className="alert alert-danger">
                            <a href="#" onClick={() => { setAuthError(false) }} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Error!</strong> Please Login In First
                        </div>
                    </div>
                    :
                    ""
            }



        </>
    )
}