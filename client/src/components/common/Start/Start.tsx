
type Props = {
    review: number
    numConstomer?: number
}

export default function Start({ review, numConstomer }: Props) {

    const start = Math.floor(review as number);
    const HalfStart = review as number - start;
    const emptyStart = Math.floor(5 - (review as number))

    return (
        review !== 0.0 ?
            <span className="ratings" >
                <span>{review.toFixed(1)} </span>
                {
                    Array(start | 0).fill(0).map((_, index) => (
                        <i key={index} className="fa fa-star" style={{ color: "#fbc634" }}></i>
                    ))
                }
                {
                    HalfStart > 0 ?
                        <i className="fa fa-star-half-alt" style={{ color: "#fbc634" }}></i>
                        : ""
                }
                {
                    Array(emptyStart | 0).fill(0).map((_, index) => (
                        <i key={index} className="fa fa-star" ></i>
                    ))
                }
                {
                    numConstomer ? <span className="">  ( {numConstomer} )  </span> : ""
                }

                {/* Lenght of reviews */}
            </span>
            :
            <span className="ratings" ></span>
    )
}
