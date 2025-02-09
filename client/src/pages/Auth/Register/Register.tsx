import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/Hooks";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { registerSchema, registerType } from "../../../validation/registerSchema"
import { AuthInput } from "../../../components/common";

import { actRegister, clearAuthState } from "../../../store/auth/AuthSlice";
import { Button, Form } from "react-bootstrap";
import { Success, Error } from "../../../components/feedback/";

type TRegisterWithCon = registerType

export default function Register() {

    const dispatch = useAppDispatch()
    const { error, loading } = useAppSelector(state => state.auth)
    const [clickBtn, setClickBtn] = useState(true)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TRegisterWithCon>({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
    })

    const onSubmit: SubmitHandler<TRegisterWithCon> = (data) => {
        setClickBtn(false)
        const { name, surname, email, phone, password } = data
        dispatch(actRegister({ name, surname, email, phone, password })).unwrap()
            .then(() => {
                setClickBtn(true)
                reset()
            }).catch(() => {
                setClickBtn(true)
            }).finally(() => {
                setClickBtn(true)

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
                        {
                            loading === "success" ? <Success title="Success" message="Your are registred successfully, Plase Login" /> : ""
                        }

                        <h4>Register</h4>
                        <Form onSubmit={handleSubmit(onSubmit)} className="aa-login-form">
                            <AuthInput
                                lable="First Name"
                                placeholder="First Name"
                                type="text"
                                name="name"
                                register={register}
                                error={errors.name?.message}

                            />
                            <AuthInput
                                lable="Last Name"
                                placeholder="Last Name"
                                type="text"
                                name="surname"
                                register={register}

                                error={errors.surname?.message}

                            />
                            <AuthInput
                                lable="Phone Number"
                                placeholder="Phone Number"
                                type="text"
                                name="phone"
                                register={register}
                                error={errors.phone?.message}

                            />
                            <AuthInput
                                lable="Email address"
                                placeholder="Email"
                                type="text"
                                name="email"
                                register={register}
                                error={errors.email?.message}
                            />
                            <AuthInput
                                lable="Password"
                                placeholder="Password"
                                type="password"
                                name="password"
                                register={register}
                                error={errors.password?.message}

                            />
                            <AuthInput
                                lable="Confirm Password"
                                placeholder="Confirm Password"
                                type="password"
                                name="confPassword"
                                register={register}
                                error={errors.confPassword?.message}

                            />
                            <Button disabled={!clickBtn} variant="primary" type="submit" style={{ outline: "none", border: "none", backgroundColor: "#F66" }}   >
                                {!clickBtn ? "Submit ..." : "Submit"}
                            </Button>
                        </Form>

                    </div>
                </div>
            </section>
        </>

    )
}
