import ContentLoader from "react-content-loader"

const SkeletonCart = () => (
    <ContentLoader
        speed={2}
        width={1140}
        height={690}
        viewBox="0 0 1140 690"
        backgroundColor="#f2eeee"
        foregroundColor="#cfcfcf"
    >
        <rect x="0" y="50" rx="18" ry="18" width="1140" height="450" />
    </ContentLoader>
)

export default SkeletonCart