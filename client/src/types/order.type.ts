import { TLoading } from "./loading.type"

export interface IOrderState {
    OneOrder: {
        _id: string
        name: string,
        desc: string
        quantity: number
        updateDate: string
        totalPrice: number
        status: string
        products: {
            id: string
            image: string
            name: string
            qunatity: number
            price: {
                price: number
                detail: {
                    key: string
                    value: string
                }
            }
        }[]
        address: {
            city: string,
            district: string
            address: string

        } | {}
    } | null,
    Orders: {
        id: string
        createdAt: string
        status: string
        totalPrice?: number
        products: {
            image: string
        }[]
    }[] | []
    loading: TLoading,
    error: string | null
}


// export type TOrder = {
//     Catagories: {
//         catagory: { name: string },
//         subCatagories: {
//             id: string,
//             name: string
//         }[]
//     }[]
// }


