import * as React from "react"
import { graphql } from 'gatsby'
import { LogoBar } from "../components/logobar";
import { ContenfulCard } from "../components/contenfulCard";

const Contenful = (prop) => {
    return (
        <div>
            <LogoBar />
            <ContenfulCard data={prop.data.contentfulAliciaInterior} />
        </div>
    )
}

export default Contenful;

export const query = graphql`
    query ($url: String) {
        contentfulAliciaInterior(url: {eq: $url}) {
            title
            description {
                description
            }
            url
            credits
            media {
                id
                gatsbyImageData
            }
        }
    }
`
