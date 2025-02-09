import ContentLoader from "react-content-loader"

const SkeletonProducts = () => (
    <ContentLoader
        speed={2}
        width={440}
        height={600}
        viewBox="0 0 380 600"
        backgroundColor="#f2eeee"
        foregroundColor="#cfcfcf"
    >
        <rect x="0" y="50" rx="30" ry="30" width="380" height="380" />
    </ContentLoader>
)

export default SkeletonProducts