import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks"

import { loginSchema, loginSchemaType } from "../../../validation/loginSchema"

import { actLogin, clearAuthState } from "../../../store/auth/AuthSlice"
import { Error } from "../../../components/feedback"
import { Button } from "react-bootstrap"
import { actGetCartDataWhenLogin } from "../../../store/cart/cartSlice"
import { actGetWishlistData } from "../../../store/wishlist/wishlistSlice"

export default function Login() {

    const dispatch = useAppDispatch()
    const { error } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const [clickBtn, setClickBtn] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<loginSchemaType>({
        resolver: yupResolver(loginSchema),
        mode: "onBlur"
    })
    const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
        setClickBtn(true)
        dispatch(actLogin(data)).unwrap().then(() => {
            dispatch(actGetCartDataWhenLogin())
            dispatch(actGetWishlistData())
            navigate("/")
            reset()
            setClickBtn(false)
        }).catch(() => {
            setClickBtn(false)
        })
    }
    useEffect(() => {
        return () => { dispatch(clearAuthState()) }
    }, [dispatch])


    return (
        <>
            <section id="aa-myaccount">
                <div className="container">
                    <div className="aa-myaccount-area">
                        {
                            error ? <Error title="Error : " message={error} /> : ""
                        }

                        <h4>Login</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="aa-login-form">
                            <label  >Username or Email address<span>*</span></label>
                            <input type="text"  {...register("email")} placeholder="Email" />
                            <p className="aa-lost-password" style={{ color: "red", margin: 0, marginTop: "-10px", textTransform: "capitalize" }} >{errors.email?.message}</p>

                            <label >Password<span>*</span></label>
                            <input type="password"  {...register("password")} id='password' placeholder="Password" />
                            <p className="aa-lost-password" style={{ color: "red", margin: 0, marginTop: "-10px", textTransform: "capitalize" }}  >{errors.password?.message}</p>

                            <Button disabled={clickBtn} type="submit" className="aa-browse-btn">
                                {
                                    clickBtn ? "Login ... " : "Login"

                                }
                            </Button>
                            <label className="rememberme" ><input type="checkbox" id="rememberme" /> Remember me </label>
                            <p className="aa-lost-password"><a href="#">Forget your password?</a></p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
