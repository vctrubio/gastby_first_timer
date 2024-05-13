import * as React from "react"
import { useState } from 'react';
import axios from 'axios';

import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

import * as styles from "../components/index.module.css"
import "../components/layout_customs.css"

import { Card } from "../components/card"
import { Footer } from "../components/footer";

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

const NavBar = ({ setActiveComponent, nodes }) => {
  const [isHovered, setIsHovered] = useState(true);
  console.log('data i c u ;', nodes)
  return (
    <div className="navbar">
      <div onClick={() => setActiveComponent("banner")}>About</div>
      <div onClick={() => setActiveComponent("portfolio")}>
        Portfolio
      </div>
      <div onClick={() => setActiveComponent("about")}>Info</div>
    </div>
  )
}

const About = () => {
  return (
    <div className="about-main" style={{ marginBottom: '4em' }}>
      <div>
        <h1 style={{ marginBottom: '0' }}>¿Que hacemos?</h1>
        <p className="p-2">En todos los proyectos, nos adaptamos al cliente y a sus necesidades, pero esto es una pequeña guía para orientarte en nuestro sector.</p>
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


const BottomUps = (data) => {
  return (
    <div className="bu">
      {/* <h1>Bottom ups</h1>
      <div className="d-flex justify-content-around">
        {data.map((item) => (
          <div key={item.id}>
            <GatsbyImage image={getImage(item.allPhotos[0])} alt={item.titleOfPost} />
            <p>{item.titleOfPost}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}


const Banner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="d-flex flex-column flex-md-row justify-content-center" style={{ marginBottom: '8em' }}>

        <div className="w-md-50 mx-md-3" style={{ minWidth: '380px' }}>
          <StaticImage
            src="../images/alicia_perfil.webp"
            loading="lazy"
            width={380}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="Alicia Agosti Interiorismo"
            style={{
              borderRadius: `2%`,
            }}
          />
        </div>

        <div className="text-center text-md-start " style={{ padding: '1em', maxWidth: '500px' }}>
          <h1 style={{ marginBottom: '.5em' }} >El Estudio</h1>
          <p>Somos un estudio de arquitectura de interiores y decoración, con base en Madrid, nos especializamos en diseñar espacios que no solo cumplen con las necesidades, sino que también reflejan la personalidad única de cada cliente.</p>
          <p>Nuestra aproximación se basa en la creación de ambientes creativos con alma. Establecemos un hilo conductor, un concepto de vida que abarca todo el proyecto, y elegimos cuidadosamente los materiales para cada elemento, buscando la armonía en el conjunto. Nuestro objetivo es lograr que, al final, todo encaje a la perfección y sume a una experiencia excepcional.</p>
          <p>Además, contamos con elementos de mobiliario que van más allá de lo convencional. Diseñamos y fabricamos piezas unicas, utilizando materiales que elevan la estética y funcionalidad de cada rincón. En definitiva, en nuestro estudio, transformamos espacios en expresiones únicas y a medida.</p>
        </div>
      </div>

      <About />
    </div>
  )
}

const PortfolioAll = ({ data }) => {
  const posts = data.allContentfulAliciaContent.edges;

  return (
    <div className="portfolio-all">
      {posts.map(
        ({ node }) => (
          <div key={node.id}

          // onClick={() => window.location.href = `/${node.slug}`}
          >
            <Card title={node.titleOfPost} description={node.descriptionOfPost.descriptionOfPost} coverUrl={node.allPhotos[0].file.url} />
          </div>
        )
      )}
    </div>
  )
}

const IndexPage = ({ data }) => {
  const [activeComponent, setActiveComponent] = useState("banner");

  return (
    <div style={{ textAlign: 'center' }}>
      <LogoBar setActiveComponent={setActiveComponent} />
      <NavBar setActiveComponent={setActiveComponent} nodes={data.allContentfulAliciaContent.edges} />
      {activeComponent === "banner" && <Banner />}
      {activeComponent === "portfolio" && <PortfolioAll data={data} />}
      {activeComponent === "info" && <About />}

      <div className="d-flex justify-content-center">
        <BottomUps data={data.allContentfulAliciaContent.edges} />
      </div>
      <Footer />
    </div>
  )
}

export const Head = () => <Seo title="Interiorismo" />

export default IndexPage

export const queryGL = graphql`
  query MyQuery {
    allContentfulAliciaContent {
      edges {
        node {
          id
          slug
          titleOfPost
          descriptionOfPost {
            descriptionOfPost
          }
          allPhotos {
            id
            file{
              url
            }
            gatsbyImageData
          }
        }
      }
    }
  }
`