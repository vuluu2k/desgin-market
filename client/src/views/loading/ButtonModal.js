import React from 'react'
import {OverlayTrigger,Tooltip} from 'react-bootstrap'
import {useContext} from 'react';
import {QuoteContext} from '../../contexts/QuoteContext';
import {CartContext} from '../../contexts/CartContext';
import './Style.css'
export default function ButtonModal() {
    const {setShowQuote}= useContext(QuoteContext);
    const {setShowCart,getCart}= useContext(CartContext);
    const carts=getCart();
    const quantitys=()=>{
        let sum=0;
        carts!==null&&carts.forEach(c =>{
            sum+=c.quantity
        })
        return sum
    }
    return (
        <>
            <OverlayTrigger
                placement="right"
                delay={{show:250,hide:300}}
                overlay={
                    <Tooltip>
                        <div style={{fontWeight:'bolder'}}>Đăng kí nhận thông tin sản phẩm</div>
                    </Tooltip>
                }
            >
                <button className='btn-floating-quote' variant='dark' onClick={()=>setShowQuote(true)}>
                    <i className="fas fa-money-check text-white"></i>
                </button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="right"
                delay={{show:250,hide:300}}
                overlay={
                    <Tooltip>
                        <div style={{fontWeight:'bolder'}}>Giỏ hàng</div>
                    </Tooltip>
                }
            >
                <button className='btn-floating-cart btn_cart' variant='dark' onClick={()=>setShowCart(true)}>
                    <div className="count_cart d-flex justify-content-center align-items-center">{quantitys()}</div>
                    <i className="fas fa-shopping-cart text-white" style={{marginRight:'2px'}}></i>
                </button>
            </OverlayTrigger>
        </>
    )
}
