import React from 'react'
import {FormControl,Button,Form} from 'react-bootstrap';
import './Style.css';

export default function NavBarAdmin() {
    return (
        <div className="head d-flex justify-content-between align-items-center">
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    <i className="fas fa-bell" style={{color:'#0091FF'}}></i>
                </div>
            </div>
        </div>
    )
}
