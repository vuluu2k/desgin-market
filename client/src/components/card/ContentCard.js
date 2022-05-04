import React from 'react'

export default function ContentCard(props) {
    return (
        <div style={{width:'100%'}}>
            <div>
                <img src={props.src} alt=""  />
                <span style={{color:'#ED1C24',fontSize:'16.8px',fontWeight:'650',marginLeft:'2.8px'}}>{props.title}</span>
            </div>
            <div style={{textAlign:'justify',fontSize:'15.2px',fontWeight:'500'}}>
               {props.content}
            </div>
        </div>
    )
}
