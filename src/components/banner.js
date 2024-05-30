import React from 'react';
import { About } from "./about"
import { StaticImage } from "gatsby-plugin-image"
import { Footer } from "../components/footer";

export const Banner = () => {

    //setSeoTitlw to Interiorismo
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6em'}}>
        <div className="d-flex flex-column flex-md-row justify-content-center" style={{ marginBottom: '4em', marginTop: '2em'}}>
  
          <div className="w-md-50 mx-md-3" style={{ minWidth: '380px' }}>
            <StaticImage
              src="../images/alicia_perfil.webp"
              loading="lazy"
              width={305}
              quality={100}
              formats={["auto", "webp"]}
              alt="Alicia Agosti Interiorismo"
              style={{
                borderRadius: `2%`,
                marginBottom: '1em'
              }}
            />
          </div>
  
          <div className="text-center text-md-start " style={{ padding: '0 1.1em 0 1.1em', maxWidth: '500px' }}>
            <h1 style={{marginBottom: '2rem'}} >El Estudio</h1>
            <p>Somos un estudio de arquitectura de interiores y decoración, con base en Madrid, nos especializamos en diseñar espacios que no solo cumplen con las necesidades, sino que también reflejan la personalidad única de cada cliente.</p>
            <p>Nuestra aproximación se basa en la creación de ambientes creativos con alma. Establecemos un hilo conductor, un concepto de vida que abarca todo el proyecto, y elegimos cuidadosamente los materiales para cada elemento, buscando la armonía en el conjunto. Nuestro objetivo es lograr que, al final, todo encaje a la perfección y sume a una experiencia excepcional.</p>
            <p>Además, contamos con elementos de mobiliario que van más allá de lo convencional. Diseñamos y fabricamos piezas unicas, utilizando materiales que elevan la estética y funcionalidad de cada rincón. En definitiva, en nuestro estudio, transformamos espacios en expresiones únicas y a medida.</p>
          </div>
        </div>
  
        <About />
        <Footer />
      </div>
    )
  }
  