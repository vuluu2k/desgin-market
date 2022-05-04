import React,{useContext} from 'react'
import {Card,Button} from 'react-bootstrap';
import {ConfirmContext} from '../../contexts/ConfirmContext';

export default function ItemCart({cart}) {
    const {setShowConfirmDeleteProudctInCart} = useContext(ConfirmContext)
    
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <Card border="light" style={{ width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center">
                <img src={cart.product.imgCarUrl} alt={cart.product.nameCar} width="30%" height="30%" />
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title as="h6" style={{width: '100%'}} >{cart.product.nameCar}</Card.Title>
                            <div className="d-flex align-items-center">
                                <div>
                                    {cart.quantity} x <span style={{color:'#C82333',fontWeight:'500'}}>{formatToCurrency(cart.product.costCar)}<sup>₫</sup></span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline-danger" onClick={()=>setShowConfirmDeleteProudctInCart({show:true,productId:cart.product._id})} ><i className="fas fa-trash-alt"></i></Button>
                    </div>
                </Card.Body>
            </div>
        </Card>
    )
}
