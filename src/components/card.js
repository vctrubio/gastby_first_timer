import * as React from "react"
import { useState } from 'react';

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import './card.css'


export const Card = ({ title, description, coverUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                backgroundImage: `url(${coverUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="card-portfolio"
        >
            <h3 style={{color: 'white'}}>{title}</h3>
            {/* {isHovered && <p>{description}</p>} */}

        </div>
    )
}
