import React from 'react'
import SVG from 'react-inlinesvg'
import whatsappSVG from '../svgs/whatsapp-black.svg'
import phoneSVG from '../svgs/phone-black.svg'
import mailSVG from '../svgs/mail-black.svg'
import instagramSVG from '../svgs/insta-black.svg'
import './footer.css'

export const Footer = () => {
    return (
        <footer>
            <a href="https://wa.me/+34630199112">
                <SVG src={whatsappSVG} className='svg-icon' />
            </a>
            <a href="tel:+34630199112" >
                <SVG src={phoneSVG} className='svg-icon' />
            </a>
            <a href="https://www.instagram.com/alicia.agosti.interiorismo/" taget="_black" rel="noopener noreferrer">
                <SVG src={instagramSVG} className='svg-icon' />
            </a>
            <a href="mailto:estudio@aliciaagosti..com">
                <SVG src={mailSVG} className='svg-icon' />
            </a>
        </footer>
    )
}