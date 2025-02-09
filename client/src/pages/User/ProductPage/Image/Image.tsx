
type Props = {
    Images: string[] | undefined
}
const Image = ({ Images }: Props) => {
    return (
        <>
            <div className="ecommerce-gallery" data-mdb-ecommerce-gallery-init data-mdb-zoom-effect="true" data-mdb-auto-height="true">
                <div className="row py-3 shadow-5"  >
                    <div className="" >
                        <div className="lightbox" data-mdb-lightbox-init>
                            <img
                                src={Images ? Images[0] : ""}
                                alt="Gallery image 1"
                                width={300}
                                height={320}
                            />
                        </div>
                    </div>
                    <div className="" style={{ display: "flex", justifyContent: "center" }}>
                        {
                            Images?.map((el, index) => (
                                <div key={index}>
                                    <img
                                        src={el}
                                        data-mdb-img="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/14a.webp"
                                        alt="Gallery image 1"
                                        className="active w-100"
                                        width={90}
                                        height={110}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Image
