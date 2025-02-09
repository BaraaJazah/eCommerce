
import { Title, Input, ProductDetial } from "./index"
import LottieHandler from "../../../components/feedback/LottieFiles/LottieHandler"
import UseCheckoutForm from "./UseCheckoutForm"


export default function Checkout() {

    const { orderPlacedSuccess,
        navigation,
        handleSubmit,
        onSubmit,
        register,
        cartProducts,
        CardElement,
        loading, }
        = UseCheckoutForm()

    return (
        <>
            {
                orderPlacedSuccess ?
                    <div style={{ margin: "10px 0", marginBottom: "40px" }}>
                        <LottieHandler pageName="success" />
                        <p onClick={() => { navigation("/", { replace: true }) }} style={{
                            backgroundColor: "#FF6666", textAlign: "center",
                            width: "50%", margin: "auto", borderRadius: "12px"
                        }} >
                            <p style={{ color: "#fff", padding: "10px", }} >Go To Home</p>
                        </p>
                    </div>
                    :
                    <section id="checkout">
                        <div className="container">
                            <div className="row">
                                <div className="checkout-area">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="col-md-12" style={{ display: "flex", margin: "auto" }} >
                                            <div className="checkout-left "  >
                                                <div className="panel-group" >
                                                    <div className="panel panel-default aa-checkout-billaddress">
                                                        <Title title="Address Details" href="#collapseThree" />
                                                        <div id="collapseThree" className="panel-collapse collapse in">
                                                            <div className="panel-body">
                                                                <div className="row">
                                                                    <Input register={register} name="city" placeholder="City" numPart={6} required />
                                                                    <Input register={register} name="district" placeholder="District" numPart={6} required />
                                                                </div>
                                                                <div className="row">
                                                                    <Input register={register} name="appartment" placeholder="Appartment" numPart={6} required />
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="aa-checkout-single-bill">
                                                                            <textarea  {...register("address", { required: true })} cols={8} rows={3}></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="checkout-left" >
                                                <div className="col-md-12">
                                                    <div className="checkout-right" >
                                                        <div>
                                                            <Title title="Order Summary" />
                                                            <div className="aa-order-summary-area">
                                                                <table className="table table-responsive">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            cartProducts?.cartProducts.map((el, index) => {
                                                                                if (el.select === true)
                                                                                    return (
                                                                                        <ProductDetial key={index} name={el.product.name} price={el.productPriceDetials?.totalProductPrice} quantity={el.quantity} />
                                                                                    )
                                                                            })
                                                                        }

                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <th>Total</th>
                                                                            <td>{cartProducts?.totalPrice}$</td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Title title="Checkout" />
                                                            <div className="aa-payment-method">

                                                                <div style={{ margin: "20px 0" }}>
                                                                    <CardElement
                                                                        options={{
                                                                            hidePostalCode: true,
                                                                            style: {
                                                                                base: {
                                                                                    fontSize: '20px',
                                                                                },
                                                                                invalid: {
                                                                                    color: 'red',
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </div>
                                                                <input type="submit" disabled={loading} value={loading ? "Place Order ..." : "Place Order"} className="aa-browse-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </section >
            }
        </>

    )
}
