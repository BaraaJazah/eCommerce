import * as yup from "yup"

const loginSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })
    .required()

type loginSchemaType = yup.InferType<typeof loginSchema>;

export { loginSchema, type loginSchemaType }