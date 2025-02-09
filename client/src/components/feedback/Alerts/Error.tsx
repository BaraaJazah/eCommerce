
type Props = {
    title: string,
    message: string
}
export default function Error({ title, message }: Props) {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>{title}  </strong> {message}
        </div>
    )
}
