import { TLoading } from "./loading.type"

export interface ICartState {
    cartProducts: {
        cartProducts: {
            _id: string
            name: string
            desc: string
            select: boolean
            quantity: number
            productPrice_id: string
            product: {
                _id: string,
                name: string,
                desc: string
                images: string[]
            }
            prices: {
                typeKey: string
                typeValue: {
                    size: string
                    price: number
                    oldPrice: number
                    quantity: number
                    _id: string
                }
            },
            productPriceDetials: {
                totalProductPrice: number
            }
        }[],
        totalPrice: number

    } | null
    cartIds: { [key: number]: number }
    loading: TLoading,
    error: {
        message: string,
        status: number
    } | string | null
}


export type TCart = {
    cartProducts: {
        id: string
        name: string
        desc: string
        select: boolean
        quantity: number
        prices: {
            typeKey: string
            typeValue: {
                size: string
                price: number
                oldPrice: number
                quantity: number
                _id: string
            }
        }
    }[] | null
}


