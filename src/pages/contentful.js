import * as React from "react"
import { graphql } from 'gatsby'

const Contenful = (prop) => {
    return (
        <div>
            hi there
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