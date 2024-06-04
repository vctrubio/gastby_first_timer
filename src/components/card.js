import * as React from "react"
import './card_portfolio.css'

export const Card = ({ title, coverUrl }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '400px',
                height: '360px',
                margin: '20px',
                cursor: 'pointer',
                borderRadius: '4px',
                backgroundImage: `url(${coverUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="card-portfolio"
        >
            <div className="card-portfolio-opacity"></div>
            <div id='card-title'>{title}</div>
        </div>
    )
}
