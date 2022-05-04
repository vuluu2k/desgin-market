import React from 'react'
import {Toast} from 'react-bootstrap';
import {useContext} from 'react';
import {CommentContext} from '../../contexts/CommentContext';
export default function ToastComment() {
    const {showToastComment:{show,message},setShowToastComment}=useContext(CommentContext);
    return (
        <Toast 
            style={{position:'fixed',top:'10%',right:'10px',zIndex:'2'}} 
            onClose={()=>setShowToastComment({show:false,message:''})} 
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