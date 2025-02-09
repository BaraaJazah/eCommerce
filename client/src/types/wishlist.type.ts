import { TLoading } from "./loading.type"

export interface IWishlistState {
    wishlistProducts: {
        _id: string
        product_id: string
        product: {
            id: string
            name: string
            desc: string
            review: number
            numConstomer: number
            love: number
            images: string[]
            isLiked?: boolean
            prices: {
                typeKey: string
                typeValue: {
                    size: string
                    price: number
                    oldPrice: number
                    quantity: number
                    _id: string

                }[]
            }
        }
    }[] | []
    wishlistIds: string[]
    loading: TLoading,
    error: string | null
}


export type TWishlist = {
    wishlistProducts: {
        id: string
        name: string
        desc: string
        review: number
        numConstomer: number
        images: string[]
        love: number
        price: {
            typeKey: string
            typeValue: {
                size: string
                price: number
                oldPrice: number
                quantity: number
                _id: string
            }[]
        }
    }[] | []
}


