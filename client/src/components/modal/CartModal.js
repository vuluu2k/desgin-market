import React from 'react'
import {Button,Modal} from 'react-bootstrap'
import {useContext} from 'react';
import ItemCart from './ItemCart';
import {CartContext} from '../../contexts/CartContext'
import {Link} from 'react-router-dom';

export default function CartModal() {
    const {showCart, setShowCart,getCart} = useContext(CartContext);
    const carts=getCart();
    const handleClose = () => setShowCart(false);
    const sumMoney = () =>{
        let sum=0;
        carts&&carts.forEach(cart=>{
          sum+=cart.product.costCar*cart.quantity;
        })
        return sum;
    }
    const formatToCurrency=amount=>{
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <>
        <Modal show={showCart} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Giỏ hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {(carts&&carts.length!==0)?carts.map(cart=>(
                <ItemCart key={cart.product._id} cart={cart} />
              )):<h6 align="center">Chưa có sản phẩm nào được thêm vào </h6> }
              <hr />
                <div align="center" style={{fontWeight:'bold'}}>
                  Tổng phụ: <span style={{color:'#C82333'}}>{formatToCurrency(sumMoney())}<sup>₫</sup></span>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button to="/cart" variant="danger" onClick={handleClose} as={Link} >
              Xem giỏ hàng
            </Button>
            <Button to="/pay" as={Link}  variant="dark" onClick={handleClose}>
              Thanh toán
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
