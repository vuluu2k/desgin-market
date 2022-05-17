import React from 'react'

export default function InforContact({css}) {
    return (
        <p style={{fontWeight:'bolder'}}>
            <strong>Market Design HAUI</strong>
            <br/>
            <i className="fa-solid fa-location-dot" style={{color:"Black"}}></i> Đại học công nghiệp Hà Nội - Bắc Từ Liêm - Hà Nội
            <br/>
            <i className="fa-solid fa-phone" style={{color:"Black"}}></i>
            <a href="tel:0379218450" className={css}> 0379218450</a>
            <br/>
            <i className="fa-solid fa-envelope" style={{color:"Black"}}></i>
            <span>
                <a href="mailto:duongthuytien025@gmail.com" className={css}> duongthuytien025@gmail.com</a>    
            </span>
            <br/>
            <i className="fa-solid fa-link" style={{color:"Black"}}></i> https://designmarket2k.netlify.app/home
        </p>
    )
}
