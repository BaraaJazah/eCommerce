import Lottie from "lottie-react"
import { TLoading } from "../../../types/loading.type"
import { SkeletonProducts, SkeletonCart } from "../Skeleton"
import lottie_NotFound from "../../../assets/LottieFile/AnimationNotFound.json"


type Props = {
    children: React.ReactNode
    loading: TLoading
    error?: string | null
    PageName?: "Product" | "Cart" | "Wishlist"
}


export default function Loading({ children, loading, error, PageName = "Product" }: Props) {

    const Skeleton = () => {
        if (PageName === "Product") {
            return (
                <div style={{ textAlign: "center", marginLeft: "50px" }}>
                    {
                        Array(4).fill(0).map((el, index) => {
                            return (
                                < SkeletonProducts key={index} />
                            )
                        })
                    }
                </div>
            )
        } else if (PageName === "Cart" || PageName === "Wishlist") {
            return (
                <div style={{ textAlign: "center", }}>
                    < SkeletonCart />
                </div>
            )
        }
    }

    if (loading === "pending")
        return (
            < Skeleton />
        )
    else if (error)
        return (
            <Lottie animationData={lottie_NotFound} style={{ height: "60vh" }} />
        )
    else
        return (
            <>
                {children}
            </>)
}


