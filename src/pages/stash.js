/*
const PortfolioAll = ({ data }) => {
    const posts = data.allContentfulAliciaContent.edges;

    return (
        <div>
            {posts.map(({ node }) => (
                <div key={node.id}>
                    <h2>{node.titleOfPost}</h2>
                    <h1>{node.descriptionOfPost.descriptionOfPost}</h1>
                    {node.allPhotos && node.allPhotos.length > 0 && (
                        <GatsbyImage
                            key={node.allPhotos[0].id}
                            image={node.allPhotos[0].gatsbyImageData}
                            alt="call hernansh"
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
*/