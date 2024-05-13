import React from 'react'
import SVG from 'react-inlinesvg'
import whatsappSVG from '../svgs/whatsapp.svg'
import mailSVG from '../svgs/mail.svg'
import instagramSVG from '../svgs/insta.svg'
import phoneSVG from '../svgs/phone.svg'

import './footer.css'

// +34 630 19 91 12

export const Footer = () => {
    return (
        <footer>
            <div>
                <a href="https://wa.me/+34630199112">
                    <SVG src={whatsappSVG} className='svg-icon' />
                </a>
                <a href="tel:+34630199112" >
                    <SVG src={phoneSVG} className='svg-icon' />
                </a>
                <div className='d-none d-md-block'>
                    +34 630 19 91 12
                </div>
            </div>
            <a href="https://www.instagram.com/alicia.agosti.interiorismo/">
                <SVG src={instagramSVG} className='svg-icon' />
                <div className='d-none d-md-block'>
                    alicia.agosti.interiorismo
                </div>
            </a>
            <a href="mailto:alicia@aliciaagosti.com">
                <SVG src={mailSVG} className='svg-icon' />
                <div className='d-none d-md-block'>
                    alicia@aliciaagosti.com
                </div>
            </a>
        </footer>
    )
}