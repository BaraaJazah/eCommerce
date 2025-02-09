
type props = {
    title: string
    href?: string
}
export default function Title({ title, href = "" }: props) {
    return (
        <div className="panel-heading">
            <h4 className="panel-title">
                <a data-toggle="collapse" href={href}>
                    {title}
                </a>
            </h4>
        </div>
    )
}
