import { Path, UseFormRegister } from "react-hook-form"


interface IFormValues {
    address: string
    city: string
    appartment: string
    district: string
}

type Props = {
    placeholder: string
    numPart: 4 | 6 | 12
    name: Path<IFormValues>
    register: UseFormRegister<IFormValues>
    required: boolean
}

const Input = ({ placeholder, numPart, name, register, required }: Props) => {

    let myStyle = ""
    if (numPart === 4)
        myStyle = "col-md-4"
    else if (numPart === 6)
        myStyle = "col-md-6"
    else if (numPart === 12)
        myStyle = "col-md-12"

    return (
        <div className={myStyle}>
            <div className="aa-checkout-single-bill">
                <input  {...register(name, { required })} type="text" placeholder={placeholder} />
            </div>
        </div>
    )
}


export default Input 
