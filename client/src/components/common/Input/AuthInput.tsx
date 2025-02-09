import { Form } from "react-bootstrap"
import { UseFormRegister, Path } from "react-hook-form"
import { registerType } from "../../../validation/registerSchema"
import "./styles.css"

type TRegisterWithConf = registerType

type Props = {
    name: Path<TRegisterWithConf>,
    lable: string,
    type?: "text" | "password" | "number"
    placeholder: string
    register: UseFormRegister<TRegisterWithConf>

    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: any
    success?: string

}

const AuthInput = ({ name, lable, type = "text", placeholder, register, error, success }: Props) => {

    // const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    //     if (onBlur) {
    //         onBlur(e);
    //         register(name).onBlur(e);
    //     } else {
    //         register(name).onBlur(e);
    //     }
    // };

    return (
        <>
            <Form.Group className="mb-3" >
                <Form.Label >{lable}</Form.Label>
                <Form.Control
                    type={type}
                    placeholder={placeholder}

                    {...register(name)}
                    isInvalid={!!error}
                    isValid={success ? true : false}

                />

                <Form.Control.Feedback type="invalid" style={{ color: "red", fontSize: "14px", }}>
                    {
                        typeof error === "string" ?
                            error
                            : error?.message
                    }
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>

            </Form.Group>

        </>
    )
}

export default AuthInput 
