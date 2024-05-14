import * as React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/seo"
import { LogoBar } from "./index";

const Contentful = (prop) => {
    const [isLoading, setIsLoading] = React.useState(true)

    const ptr = prop.data.contentfulAliciaContent
    
    React.useEffect(() => {
        if (ptr.allPhotos.length > 0) {
            setIsLoading(false)
        }
    }, [ptr.allPhotos])
    
    return (
        <div>
            <LogoBar />
            <Seo title={ptr.titleOfPost} />
            <div className="container text-center mt-4">
                <div>
                    <h1 style={{}}>{ptr.titleOfPost}</h1>
                    <p style={{ fontSize: '20px' }}>{ptr.descriptionOfPost.descriptionOfPost}</p>
                </div>
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        ptr.allPhotos.map((photo) => (
                            photo.gatsbyImageData && (
                                <GatsbyImage
                                    key={photo.id}
                                    image={photo.gatsbyImageData}
                                    alt={ptr.titleOfPost}
                                    style={{ margin: '1rem' }}
                                />
                            )
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}


export default Contentful;

export const query = graphql`
    query ($slug: String) {
        contentfulAliciaContent(slug: {eq: $slug}) {
            titleOfPost
            descriptionOfPost {
                descriptionOfPost
            }
            allPhotos {
                id
                gatsbyImageData
            }
        }
    }
`