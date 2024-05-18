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
      <div className="container text-center mt-4">
        <div className='p-2'>
          <h1 style={{ fontSize: '44px' }}>{node.title}</h1>
          <p style={{ fontSize: '20px' }}>{node.description.description}</p>
          {node.credits && <p style={{ fontSize: '18px', fontWeight: 'lighter'}}>{node.credits}</p>}
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