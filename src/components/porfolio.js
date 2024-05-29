
import React from 'react';
import { Card } from "../components/card"
import { ContenfulCard } from "../components/contenfulCard";

export const PortfolioAll = ({ edges, contentfulTmp, setContentfulTmp }) => {
    const handleCardClick = (cardData) => {
      setContentfulTmp(cardData);
    };
  
    const getTitleOpacity = () => {
      if (window.innerWidth < 768) {
        return "title-opacity";
      }
      return "";
    }
  
    const CardsItr = () => {
      return (
        edges.length > 0 ?
          edges.map(({ node }) => (
            <div key={node.id} onClick={() => handleCardClick(node)}>
              <Card
                title={<div className={getTitleOpacity()}>{node.title}</div>}
                coverUrl={node.media[0].file.url}
              />
            </div>
          ))
          :
          <h2 style={{ padding: '12px' }}>No encontramos lo que buscas</h2>
      );
    };
  
    return (
      <div className="portfolio-all">
        {contentfulTmp ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <ContenfulCard data={contentfulTmp} />
            <button className='back-btn mt-3' onClick={() => setContentfulTmp(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
              </svg>
            </button>
          </div>
        ) : (
          <CardsItr/>
        )}
      </div>
    )
  }