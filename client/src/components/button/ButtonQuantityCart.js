import React,{useState,useEffect,useContext} from 'react'
import {Button} from 'react-bootstrap';
import {CartContext} from '../../contexts/CartContext';

export default function ButtonQuantityCart({cart}) {
    const [stateQuantity,setStateQuantity]=useState({
        quantity:cart.quantity
    })
    const {updateQuantityCart} = useContext(CartContext);
    useEffect(()=>setStateQuantity({
        quantity:cart.quantity
    }),[cart.quantity])
    const {quantity}=stateQuantity;
    const onChangeQuantity=(event)=>{
        setStateQuantity({
            [event.target.name]:event.target.value
        })
        updateQuantityCart(cart.product._id,event.target.value)
    }
    const onClickUpdateQuantityUp=()=>{
        setStateQuantity({
            quantity:quantity+1
        })
        updateQuantityCart(cart.product._id,Number(quantity)+1)
    }
    const onClickUpdateQuantityDown=()=>{
        if(quantity===1){
            return
        }
        setStateQuantity({
            quantity:quantity-1
        })
        updateQuantityCart(cart.product._id,Number(quantity)-1)
    }
    return (
        <div className="d-flex">
            <Button variant="dark" style={{width:'30px',height:'30px'}} size="sm" onClick={onClickUpdateQuantityDown} >-</Button>
            <input type="text" id="quantityCart" name="quantity" value={quantity} onChange={onChangeQuantity} style={{width:'30px',height:'30px',textAlign:'center'}} />
            <Button variant="dark" style={{width:'30px',height:'30px'}} size="sm" onClick={onClickUpdateQuantityUp} >+</Button>
        </div>
    )
}
