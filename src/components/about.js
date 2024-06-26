import React from 'react';
import './about.css'

export const About = () => {

  return (
    <>
      <div className="about-main" style={{ marginBottom: '4em', marginTop: '4em' }}>
        <div>
          <h1 style={{ marginBottom: '0' }}>¿Que hacemos?</h1>
          <p className="about-title">En todos los proyectos, nos adaptamos al cliente y a sus necesidades, pero esto es una pequeña guía para orientarte en nuestro sector.</p>
        </div>
        <div className="about-component">
          <div>
            <puff>Arquitectura</puff>
            <p>Proyectamos la rehabilitación del espacio</p>
          </div>
          <div>
            <puff>Decoración</puff>
            <p>Adecuamos el mobiliario al diseño</p>
          </div>
          <div>
            <puff>Diseño de mobiliario</puff>
            <p>Creamos el mobiliario para personalizar el proyecto</p>
          </div>
        </div>
      </div>
    </>
  )
}
