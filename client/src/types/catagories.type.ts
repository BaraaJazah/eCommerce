import { TLoading } from "./loading.type"

export interface ICatagoryState {
    Catagories: {
        catagory: { name: string },
        subCatagories: {
            id: string,
            name: string
        }[]
    }[] | null | undefined
    loading: TLoading,
    error: string | null
}


export type TCatagory = {
    Catagories: {
        catagory: { name: string },
        subCatagories: {
            id: string,
            name: string
        }[]
    }[]
}


