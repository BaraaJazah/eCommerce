import Lottie from "lottie-react";
import lottie_404 from "../../../assets/LottieFile/Animation_404.json"
import lottie_Success from "../../../assets/LottieFile/AnimationSuccess.json"


type Props = {
  pageName: string
}
export default function LottieHandler({ pageName = "Error_404" }: Props) {
  const LottieHandeler = () => {
    if (pageName === "Error_404") {
      return (
        <div style={{ height: "100vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lottie animationData={lottie_404} style={{ height: "70vh" }} />
        </div>

      )
    } else if (pageName === "success") {
      return (
        <div style={{ height: "50vh", width: "100wh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lottie animationData={lottie_Success} style={{ height: "40vh" }} />
        </div>

      )
    }
  }

  return (
    <LottieHandeler />
  )

}

