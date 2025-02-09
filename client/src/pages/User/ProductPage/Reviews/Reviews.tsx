import { Start } from "../../../../components/common"
// reviewsProduct
type Props = {
    Review: {
        rating: number;
        comment: string;
        createdAt: string;
        reviewerData: {
            name: string;
            surname: string;
        };
    }[] | undefined
}

const Reviews = ({ Review }: Props) => {
    return (

        <div className="tab-pane fade " id="review">
            <div className="aa-product-review-area">
                <h4>Reviews for Product</h4>
                <ul className="aa-review-nav">

                    {
                        Review?.map((el, index) => {
                            const dateObj = new Date(el.createdAt);
                            const dateOnly = dateObj.toISOString().split("T")[0];
                            const timeOnly = dateObj.toLocaleTimeString("en-GB", { hour12: false });

                            return (
                                el.reviewerData ?
                                    <li key={index} >
                                        <div className="media">

                                            <div className="media-body">
                                                <h4 className="media-heading"><strong>{el.reviewerData?.name} {el.reviewerData?.surname}</strong> <span>{dateOnly} {timeOnly}</span></h4>
                                                <Start review={el.rating} />
                                                <p style={{ marginTop: "10px", textTransform: "capitalize" }}> {el.comment}</p>
                                            </div>
                                        </div>
                                    </li>
                                    : ""
                            )

                        })
                    }

                </ul>

            </div>
        </div>
    )
}

export default Reviews
