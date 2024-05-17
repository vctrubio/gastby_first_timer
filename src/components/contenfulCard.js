import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image"

export const ContenfulCard = (data) => {
    const node = data.data
    const [isLoading, setIsLoading] = React.useState(true)
  
    React.useEffect(() => {
      if (node.allPhotos.length > 0) {
        setIsLoading(false)
      }
    }, [node.allPhotos])
  
    return (
      <div>
        <div className="container text-center mt-4">
          <div>
            <h1 style={{ fontSize: '44px' }}>{node.titleOfPost}</h1>
            <p style={{ fontSize: '20px' }}>{node.descriptionOfPost.descriptionOfPost}</p>
          </div>
          <div>
            {isLoading ? (
              <p>No photos...</p>
            ) : (
              node.allPhotos.map((photo) => (
                photo.gatsbyImageData && (
                  <GatsbyImage
                    key={photo.id}
                    image={photo.gatsbyImageData}
                    alt={node.titleOfPost}
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