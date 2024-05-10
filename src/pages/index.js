import * as React from "react"
import { useState } from 'react';

import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

import * as styles from "../components/index.module.css"
import "../components/layout_customs.css"

const LogoBar = ({ setActiveComponent }) => {
  return (
    <div className="d-flex justify-content-around"
      onClick={() => setActiveComponent("banner")}>
      <StaticImage
        src="../images/logo.webp"
        loading="eager"
        width={182}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="Alicia Agosti Interiorismo"
        style={{
          marginBottom: `var(--space-1)`,
          marginTop: `var(--space-3)`,
        }}
      />
    </div >
  )
}

const NavBar = ({ setActiveComponent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const list = ['serrano', 'budapest', 'hummanry', 'chicago', 'france']

  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div onClick={() => setActiveComponent("portfolio")}>Portfolio</div>
      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}

const About = () => {
  return (
    <div className="about-main" style={{ marginBottom: '10em' }}>
      <div>
        <h1 style={{ marginBottom: '1rem' }}>¿Que hacemos?</h1>
        <p>En todos los proyectos, nos adaptamos al cliente y a sus necesidades, pero esto es una pequeña guía para orientarte en nuestro sector.</p>
      </div>
      <div className="about-component">
        <div>
          <h2>Aruitectura</h2>
          <p>Proyectamos la rehabilitación del espacio</p>
        </div>
        <div>
          <h2>Decoración</h2>
          <p>Adecuamos el mobiliario al diseño</p>
        </div>
        <div>
          <h2>Diseño de mobiliario</h2>
          <p>Creamos el mobiliario para personalizar el proyecto</p>
        </div>
      </div>
    </div>
  )
}

const Banner = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-center" style={{ marginBottom: '8em' }}>

        <div className="w-md-50 mx-md-3" style={{ minWidth: '420px' }}>
          <StaticImage
            src="../images/alicia_perfil.webp"
            loading="lazy"
            width={420}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Alicia Agosti Interiorismo"
            style={{
              borderRadius: `2%`,
            }}
          />
        </div>

        <div className="text-center text-md-start" style={{ padding: '1em', maxWidth: '800px' }}>
          <h1>El Estudio</h1>
          <p>Somos un estudio de arquitectura de interiores y decoración, con base en Madrid, nos especializamos en diseñar espacios que no solo cumplen con las necesidades, sino que también reflejan la personalidad única de cada cliente.</p>
          <p>Nuestra aproximación se basa en la creación de ambientes creativos con alma. Establecemos un hilo conductor, un concepto de vida que abarca todo el proyecto, y elegimos cuidadosamente los materiales para cada elemento, buscando la armonía en el conjunto. Nuestro objetivo es lograr que, al final, todo encaje a la perfección y sume a una experiencia excepcional.</p>
          <p>Además, contamos con elementos de mobiliario que van más allá de lo convencional. Diseñamos y fabricamos piezas unicas, utilizando materiales que elevan la estética y funcionalidad de cada rincón. En definitiva, en nuestro estudio, transformamos espacios en expresiones únicas y a medida.</p>
        </div>
      </div>

      <About />
    </div>
  )
}

const PortfolioAll = () => {
  //create array of 20 names in madrid
  let list = ['serrano', 'budapest', 'hummanry', 'chicago', 'france']

  return (
    <div className="d-flex flex-row justify-content-center">
      {list.map((item, index) => (
        <div className="m-3 text-align-center" key={index}>{item}</div>
      ))}
    </div>
  )
}

const IndexPage = () => {
  const [activeComponent, setActiveComponent] = useState("banner");

  return (
    <div style={{ textAlign: 'center' }}>
      <LogoBar setActiveComponent={setActiveComponent} />
      <NavBar setActiveComponent={setActiveComponent} />
      {activeComponent === "banner" && <Banner />}
      {activeComponent === "portfolio" && <PortfolioAll />}
      {activeComponent === "info" && <About />}
    </div>
  )
}



export const Head = () => <Seo title="Interiorismo" />

export default IndexPage


// <div
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
//   style={{ position: 'relative' }}
// >
//   Portfolio
//   {isHovered && (
//     <div
//       style={{
//         position: 'absolute',
//         top: '100%',
//         left: 0,
//         zIndex: 1,
//         backgroundColor: 'white',
//         border: '1px solid black',
//         padding: '10px',
//       }}
//     >
//       {items.map((item, index) => (
//         <div key={index}>{item}</div>
//       ))}
//     </div>
//   )}
// </div>