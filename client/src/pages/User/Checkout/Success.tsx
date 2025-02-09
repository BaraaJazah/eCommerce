import { useNavigate } from "react-router-dom"
import LottieHandler from "../../../components/feedback/LottieFiles/LottieHandler"

export default function Success() {
    const navigation = useNavigate()
    return (
        <div style={{ margin: "40px 0 " }}>
            <div onClick={() => { navigation("/", { replace: true }) }} className="alert alert-primary" style={{ backgroundColor: "#999", width: "50%", margin: "auto", textAlign: "center" }} role="alert">
                <p style={{ color: "#fff" }} >Go To Home</p>
            </div>
            <div>
                hello
            </div>
            {/* <LottieHandler pageName="success" /> */}
        </div>
    )
}
