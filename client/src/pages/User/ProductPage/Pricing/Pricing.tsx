
type Props = {
    prices: {
        typeKey: string
        typeValue: {
            size: string
            price: number
            oldPrice: number
            quantity: number
            _id: string
        }[]
    } | undefined
    returnPrice: (data: string) => void;
}
function Pricing({ prices, returnPrice }: Props) {

    const returnPriceHandeler = (id: string) => {
        returnPrice(id)
    }
    return (
        <>
            <h4 style={{ marginTop: "20px" }}>{prices?.typeKey}</h4>

            <ul className="nav nav-tabs" id="myTab2" style={{ marginTop: "20px" }}>
                {
                    prices?.typeValue.map((el, index) => {
                        return <li key={index} onClick={() => { returnPriceHandeler(el._id) }} className={`${index === 0 ? "active" : ""} `}  ><a href={`#${el._id}`} data-toggle="tab">{el.size}</a></li>
                    })
                }
            </ul >

            <div className="tab-content" style={{ border: "none", margin: " 20px 10px", }}>
                {
                    prices?.typeValue.map((el, index) => {
                        return <div style={{ color: "#FF6666", fontWeight: 600 }} key={index} className={`tab-pane fade in  ${index === 0 ? "active" : ""} `} id={`${el._id}`}>{el.price} $</div>

                    })
                }
            </div>
        </>
    )
}

export default Pricing
