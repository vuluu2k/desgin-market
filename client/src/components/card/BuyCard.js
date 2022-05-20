import React,{useContext} from 'react'
import {Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Style.css';
import {CartContext} from '../../contexts/CartContext';

export default function BuyCard({product}) {
    const {addToCart,setShowCart} = useContext(CartContext);
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handeBuy=()=>{
        addToCart(product._id)
    }
    return (
        <Card border="light" style={{ width: '100%'}}>
            <Link to={`/products/${product.slug}`} className="ani_buy_car"  >
                <Card.Img variant="top" src={product.imgCarUrl} />
            </Link>
            <Card.Body>
                <Link to={`/products/${product.slug}`} style={{color:'black',textDecoration: 'none'}}>
                    <Card.Title style={{textAlign:'center',fontSize:'14px',fontWeight:'bolder',textTransform:'uppercase'}}>{product.nameCar}</Card.Title>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{color:'red',fontSize:'16px'}}><strong>Giá:</strong> <span style={{color:'#CE0303',fontWeight:'bold',fontSize:'14px'}}>{formatToCurrency(product.costCar)}<sup>₫</sup></span></div>
                    <Button onClick={handeBuy} variant="danger" size="sm" ><strong>ĐẶT HÀNG</strong></Button>  
                </div>
            </Card.Body>
        </Card>
    )
}
