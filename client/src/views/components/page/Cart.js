import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col,Container,Table,Button} from 'react-bootstrap';
import {useContext} from 'react';
import {CartContext} from '../../../contexts/CartContext';
import {ConfirmContext} from '../../../contexts/ConfirmContext';
import ButtonQuantityCart from '../../../components/button/ButtonQuantityCart';
export default function Cart() {
    const{getCart} = useContext(CartContext);
    const {setShowConfirmDeleteProudctInCart}=useContext(ConfirmContext);
    const carts=getCart();
    const sumMoney=()=>{
        let sum =0 ;
        carts!=null&&carts.forEach(cart=>{
            sum+=cart.product.costCar*cart.quantity;
        })
        return sum;
    }
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    return (
        <Container style={{padding:'36px 0'}}>
            <Row>
                <Col xs={12} lg={8}  >
                    <Table borderless responsive >
                        <thead>
                            <tr style={{textTransform: 'uppercase',borderBottom:'2px solid #E3E3E3'}}>
                                <th colSpan="2" style={{padding:"12px 0"}}>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lương</th>
                                <th>Tổng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className=" font-weight-bolder">
                            {(carts&&carts.length!==0)?carts.map(cart=>(
                                <tr key={cart.product._id} style={{textTransform: 'uppercase',borderBottom:'1px solid #E3E3E3'}}>
                                    <td style={{padding:"12px 0"}}>
                                        <img src={cart.product.imgCarUrl} alt={cart.product.nameCar} className="img-fluid" width="100" height="180"/>
                                    </td>
                                    <td>
                                        {cart.product.nameCar}
                                    </td>
                                    <td className="text-red">
                                            {formatToCurrency(cart.product.costCar)}<sup>₫</sup>
                                    </td>
                                    <td>
                                        <ButtonQuantityCart cart={cart} />
                                    </td>
                                    <td className="text-red">{formatToCurrency(cart.quantity*cart.product.costCar)}<sup>₫</sup></td>
                                    <td>
                                        <Button onClick={()=>setShowConfirmDeleteProudctInCart({show:true,productId:cart.product._id})} variant="outline-danger" size="sm" style={{width:'30px',height:'30px'}}>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )):<tr>
                                    <td colSpan="5" align="center">Chưa có sản phẩm nào được thêm vào </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    <div>
                        <Button to="/home" as={Link} variant="outline-danger" style={{fontWeight:'600',width:'50%'}}>
                            <i className="fas fa-arrow-left"></i>
                            <span to='/home' style={{paddingLeft:'5px'}}>TIẾP TỤC XEM SẢN PHẨM</span>
                        </Button>
                    </div>
                </Col>
                <Col xs={12} lg={4}>
                    <Table borderless>
                        <thead>
                            <tr style={{textTransform: 'uppercase',borderBottom:'2px solid #E3E3E3'}}>
                                <th colSpan="2" style={{padding:"12px 0"}}>TỔNG SỐ LƯỢNG</th>
                            </tr>
                        </thead>
                        <tbody className=" font-weight-bolder">
                            <tr style={{borderBottom:'2px solid #E3E3E3'}}>
                                <td>Tổng phụ</td>
                                <td className="text-red">{formatToCurrency(sumMoney())}<sup>₫</sup></td>
                            </tr>
                            <tr style={{borderBottom:'2px solid #E3E3E3'}}>
                                <td>Tổng</td>
                                <td className="text-red">{formatToCurrency(sumMoney())}<sup>₫</sup></td>
                            </tr>
                            <tr >
                                <th colSpan="2" style={{padding:"12px 0"}}>
                                    <Button to="/pay" as={Link} variant="dark" style={{width:'100%',fontWeight:'600'}}>TIẾN HÀNH THANH TOÁN</Button>
                                </th>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{padding:"0"}}>
                                    <div variant="danger" 
                                        style={{
                                            backgroundColor:'#DC3545', width:'100%',
                                            height:'38px',lineHeight:'38px',
                                            textAlign:'left',fontWeight:'600',
                                            color:'#fff',borderRadius:'5px'
                                        }} 
                                    >
                                        <i style={{marginLeft:'10px'}} className="fas fa-tags"></i>
                                        <span style={{marginLeft:'5px'}}>
                                            PHIẾU ƯU ĐÃI
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
