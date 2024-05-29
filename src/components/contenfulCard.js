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

  const imageWidth = node.media.length === 4 ? '45%' : '30%';

  return (
    <div>
      <div className="container text-center mt-2">
        <div>
          <h1 style={{ fontSize: '34px' }}>{node.title}</h1>
          <p style={{ fontSize: '16px', padding: '0rem 2rem 0rem 2rem' }}>{node.description.description}</p>
          {node.credits && <p style={{ fontSize: '14px', fontWeight: 'lighter', padding: '0rem 2rem 0rem 2rem'}}>{node.credits}</p>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {isLoading ? (
            <p>No encontramos fotos...</p>
          ) : (
            node.media.map((photo) => (
              photo.gatsbyImageData && (
                <GatsbyImage
                  key={photo.title}
                  image={photo.gatsbyImageData}
                  alt={node.title}
                  style={{ 
                    width: imageWidth,
                    margin: '0.5em',
                  }}
                  imgStyle={{ 
                    objectFit: 'cover', 
                  }}
                  className="responsive-image"
                  />
              )
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1000px) {
          .responsive-image {
            width: 100% !important; // Override the width for small screens
          }
        }
      `}</style>
    </div>
  );
};