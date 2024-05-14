import * as React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { LogoBar } from "./index"

const Contenful = (prop) => {

    //isLoading state
    const [isLoading, setIsLoading] = React.useState(true)

    const ptr = prop.data.contentfulAliciaContent

    React.useEffect(() => {
        if (ptr.allPhotos.length > 0) {
            setIsLoading(false)
        }
    }, [ptr.allPhotos])

    return (
        <div>
            {/* <LogoBar /> */}
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

export default Contenful;

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