import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export const LogoBar = ({ setActiveComponent }) => {
    const handleClick = () => {
      if (setActiveComponent) {
        setActiveComponent("banner");
      } else {
        window.location.href = '/';
      }
    };
  
    return (
      <div className="d-flex justify-content-around" onClick={handleClick} style={{width: '100%'}}>
        <StaticImage
          src="../images/logoAA.webp"
          loading="eager"
          placeholder="blurred"
          quality={100}
          formats={["auto", "webp"]}
          alt="Alicia Agosti Interiorismo"
          style={{
            width: '300px',
            marginTop: '2em',
            transform: 'scale(1.4)',
          }}
        />

      </div>
    );
  };
  