
type Props = {
    Description: {
        key: string
        value: string
    }[] | undefined
}

const Description = ({ Description }: Props) => {
    return (
        <div className="tab-pane fade in active" id="description">
            <div className="bd-example">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Feature</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Description?.map((el, index) => (
                                <tr key={index}>
                                    <th scope="row"></th>
                                    <td style={{ textTransform: "capitalize" }}>{el.key}</td>
                                    <td style={{ textTransform: "capitalize" }}>{el.value}</td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Description
