import * as React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { LogoBar } from "../components/logobar";
import { ContenfulCard } from "../components/contenfulCard";

const Contenful = (prop) => {

    return (<>
    you have arrived at the contentful page
    </>)

    //isLoading state
    // const [isLoading, setIsLoading] = React.useState(true)

    // const ptr = prop.data.contentfulAliciaContent

    // React.useEffect(() => {
    //     if (ptr.allPhotos.length > 0) {
    //         setIsLoading(false)
    //     }
    // }, [ptr.allPhotos])

    // return (
    //     <div>
    //         <LogoBar />
    //         <p style={{textAlign: 'center', marginTop: '1em'}}>Mas pouede ir aqui</p>
    //         <div className="container text-center mt-4">
    //             <div>
    //                 <h1 style={{}}>{ptr.titleOfPost}</h1>
    //                 <p style={{ fontSize: '20px' }}>{ptr.descriptionOfPost.descriptionOfPost}</p>
    //             </div>
    //             <div>
    //                 {isLoading ? (
    //                     <p>Loading...</p>
    //                 ) : (
    //                     ptr.allPhotos.map((photo) => (
    //                         photo.gatsbyImageData && (
    //                             <GatsbyImage
    //                                 key={photo.id}
    //                                 image={photo.gatsbyImageData}
    //                                 alt={ptr.titleOfPost}
    //                                 style={{ margin: '1rem' }}
    //                             />
    //                         )
    //                     ))
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Contenful;

// export const query = graphql`
//     query ($url: String) {
//         contentfulAliciaInterior(url: {eq: $url}) {
//             title
//             description {
//                 description
//             }
//             url
//             credits
//             media {
//                 id
//                 gatsbyImageData
//             }
//         }
//     }
// `
