import * as yup from "yup"

const registerSchema = yup
    .object({
        name: yup.string().required({ message: "Name is required" }),
        surname: yup.string().required({ message: "Surname is required" }),
        email: yup.string().email().required({ message: "Email is required" }),
        phone: yup
            .number()
            .typeError("Phone number must be a valid number") // يعرض رسالة خطأ إذا تم إدخال نص
            .positive("Phone number must be a positive number") // يمنع الأرقام السالبة
            .integer("Phone number must be an integer") // يمنع الأرقام العشرية
            .min(1000000000, "Phone number must be at least 10 digits long") // الحد الأدنى 8 أرقام
            .max(9999999999, "Phone number must be at most 10 digits long") // الحد الأقصى 15 رقم
            .required("Phone is required"),

        password: yup.string().min(8).required({ message: "Password is required" })
            .matches(/[A-Z]/, { message: "Password must contain at least one uppercase and one lowercase letter and one number and one special character" })
            .matches(/[a-z]/, { message: "Password must contain at least one lowercase letter and one number and one special character" })
            .matches(/[0-9]/, { message: "Password must contain at least one number and one special character" })
            .matches(/[@$!%*?&#.]/, { message: "Password must contain at least special character" })

        ,

        confPassword: yup
            .string()
            .required({ message: "Confirm Password is required" })
            .oneOf([yup.ref("password")], { message: "Passwords must match" }),

    })
    .required()

type registerType = yup.InferType<typeof registerSchema>;

export { registerSchema, type registerType }




