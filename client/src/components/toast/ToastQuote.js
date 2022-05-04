import React from 'react'
import {Toast} from 'react-bootstrap';
import {useContext} from 'react';
import {QuoteContext} from '../../contexts/QuoteContext';
export default function ToastQuote() {
    const {showToastQuote:{show,message},setShowToastQuote}=useContext(QuoteContext);
    return (
        <Toast 
            style={{position:'fixed',top:'10%',right:'10px',zIndex:'2'}} 
            onClose={()=>setShowToastQuote({show:false,message:''})} 
            show={show}
            className="bg-success text-white" 
            delay={2000} 
            autohide 
        >
            <Toast.Header>
                <img
                    src="https://res.cloudinary.com/vuluu/image/upload/v1634718382/CarProject/Icon/iconmatcuoi-removebg-preview_mgqcvw.png"
                    className="rounded mr-2"
                    alt="logo Toast"
                    width="30"
                />
                <strong className="mr-auto">Thông báo</strong>
                <small> 3s trước</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}
