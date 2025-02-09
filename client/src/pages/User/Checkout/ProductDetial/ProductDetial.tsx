type Props = {
    name: string,
    price: number
    quantity: number
}
export default function ProductDetial({ name, price, quantity }: Props) {
    return (
        <tr>
            <td>{name} <strong>  x{quantity}</strong></td>
            <td>{price} $</td>
        </tr>
    )
}
