import * as React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import { LogoBar } from "../components/logobar";
import { ContenfulCard } from "../components/contenfulCard";

const Contenful = (prop) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const ptr = prop.data.contentfulAliciaInterior

    React.useEffect(() => {
        if (ptr.media && ptr.media.length > 0) {
            setIsLoading(false);
        }
    }, [ptr.media])

    return (
        <div>
            <LogoBar />
            <p style={{ textAlign: 'center', marginTop: '1em' }}>
                Mas pouede ir aqui
            </p>
            <div className="container text-center mt-4">
                <div>
                    <h1 style={{}}>{ptr.title}</h1>
                    <p style={{ fontSize: '20px' }}>{ptr.description.description}</p>
                </div>
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        ptr.media.map((photo) => (
                            photo.gatsbyImageData && (
                                <GatsbyImage
                                    key={photo.title}
                                    image={photo.gatsbyImageData}
                                    alt={ptr.title}
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
