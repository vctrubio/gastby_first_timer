import React from 'react';
import SVG from 'react-inlinesvg';
import './info.css';
import emailjs from 'emailjs-com';

import whatsappSVG from '../svgs/whatsapp-black.svg'
import phoneSVG from '../svgs/phone-black.svg'
import mailSVG from '../svgs/mail-black.svg'
import instagramSVG from '../svgs/insta-black.svg'

const Form = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_iks54bc', 'template_l508x3r', e.target, '1YErVJqzBGujS_Du3')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
       <form onSubmit={sendEmail} style={{ width: '500px' }}>
    <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" />
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name="email" />
    </div>
    <div className="mb-3">
        <label htmlFor="movil" className="form-label">Móvil</label>
        <input type="tel" className="form-control" id="movil" name="movil" />
    </div>
    <div className="mb-3">
        <label htmlFor="espacio" className="form-label">Espacio</label>
        <select className="form-control" id="espacio" name="espacio">
            <option value="">Select...</option>
            <option value="vivienda">Vivienda</option>
            <option value="restaurante">Restaurante</option>
            <option value="contract">Contract</option>
            <option value="otro">Otro</option>
        </select>
    </div>
    <div className="mb-3">
        <label htmlFor="proyecto" className="form-label">Tipo de proyecto</label>
        <select className="form-control" id="proyecto" name="proyecto">
            <option value="">Select...</option>
            <option value="obra_nueva">Obra nueva</option>
            <option value="reforma_interiorismo">Reforma de interiorismo</option>
            <option value="decoracion">Decoración</option>
            <option value="otro">Otro</option>
        </select>
    </div>
    <div className="mb-3">
        <label htmlFor="localizacion" className="form-label">Localización</label>
        <input type="text" className="form-control" id="localizacion" name="localizacion" />
    </div>
    <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <textarea className="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>

    )
}

const Icons = () => {
    return (
        <div className='info-icons'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <a href="https://wa.me/+34630199112">
                        <img src={whatsappSVG} alt="whatsapp" className='svg-icon' />
                    </a>
                    <a href="tel:+34630199112" >
                        <img src={phoneSVG} alt="phone" className='svg-icon' />
                    </a>
                    <div>
                        +34 630 19 91 12
                    </div>
                </div>
                <div className='d-flex flex-row mt-3'>
                    <a href="mailto:alicia@aliciaagosti.com">
                        <SVG src={mailSVG} className='svg-icon' />
                    </a>
                    <a href="https://www.instagram.com/alicia.agosti.interiorismo/" taget="_blank" rel="noopener noreferrer">
                        <img src={instagramSVG} alt="instagram" className='svg-icon' />
                    </a>
                    <div>
                        alicia.agosti.interiorismo
                    </div>
                </div>
            </div>
        </div>
    )
}
export const Info = () => {
    return (
        <div className='info'>
            <Icons />
            <Form />
        </div>
    )
}