import { TLoading } from "./loading.type"

export interface IProductState {
    products: {
        id: string,
        name: string,
        subCatagory_id: string,
        image: string,
        review: number,
        numCostomer: number,
        prices: {}

    }[] | []
    loading: TLoading,
    error: string | null
    oneProduct: {
        product: {
            prices: {
                typeKey: string,
                typeValue: {
                    size: string,
                    price: number,
                    oldPrice: number,
                    quantity: number,
                    _id: string
                }[],
            },
            _id: string,
            isLike?: boolean
            subCatagory_id: string
            name: string,
            desc: string,
            images: string[],
            review: number,
            love: number,
            numConstomer: number,
            active: boolean,
            details: {
                key: string,
                value: string,
            }[],
        }
        reviewsProduct:{
            rating:number
            comment:string
            createdAt:string
            reviewerData : {
                name :string
                surname:string
            }
        }[]
    } | null,
}


export type TProduct = {
    products: {
        id: string,
        name: string,
        subCatagory_id: string,
        image: string,
        review: number,
        numCostomer: number,
        prices: {}
    }
}


