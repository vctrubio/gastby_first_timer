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
      <div className="d-flex justify-content-around" onClick={handleClick}>
        <StaticImage
          src="../images/logoAA.webp"
          loading="eager"
          width={400}
          quality={100}
          //zoom into it a bit
          formats={["auto", "webp", "avif"]}
          alt="Alicia Agosti Interiorismo"
          style={{
            marginTop: `var(--space-1)`,
          }}
        />
      </div>
    );
  };
  