import * as React from "react"
import { graphql } from 'gatsby'

const Contenful = (prop) => {

    console.log('prop::: ', prop.contentfulAliciaContent)
    return (
        <div>
            hi there
            {/* {prop} */}

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