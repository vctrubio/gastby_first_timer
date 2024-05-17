import * as React from "react"
import './card_portfolio.css'

export const Card = ({ title, coverUrl }) => {
    return (
        <div
            style={{
                position: 'relative',
                backgroundImage: `url(${coverUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="card-portfolio"
        >
            <dst>{title}</dst>
        </div>
    )
}
                                