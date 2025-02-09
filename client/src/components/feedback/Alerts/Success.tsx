type Props = {
    title: string,
    message: string
}
export default function Success({ title, message }: Props) {
    return (
        <div className="alert alert-success" role="alert">
            <strong>{title} : </strong> {message}
        </div>
    )
}
