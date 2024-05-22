import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image"

export const ContenfulCard = (data) => {
  const node = data.data
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (node.media.length > 0) {
      setIsLoading(false)
    }
  }, [node.media])

  return (
    <div>
      <div className="container text-center mt-2">
        <div>
          <h1 style={{ fontSize: '34px' }}>{node.title}</h1>
          <p style={{ fontSize: '16px', padding: '0 1rem 0 1rem' }}>{node.description.description}</p>
          {node.credits && <p style={{ fontSize: '14px', fontWeight: 'lighter'}}>{node.credits}</p>}
        </div>
        <div>
          {isLoading ? (
            <p>No photos...</p>
          ) : (
            node.media.map((photo) => (
              photo.gatsbyImageData && (
                <GatsbyImage
                  key={photo.title}
                  image={photo.gatsbyImageData}
                  alt={node.title}
                  style={{ 
                    marginBottom: '1em',
                    height: '80vh',
                    width: '100%',
                  }}
                  imgStyle={{ 
                    objectFit: 'cover', 
                  }}
                  />
              )
            ))
          )}
        </div>
      </div>
    </div>
  )
}