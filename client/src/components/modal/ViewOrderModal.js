import React,{
    useContext
} from 'react'
import {Modal,Form,Row,Col,Button} from 'react-bootstrap'
import {PayContext} from '../../contexts/PayContext'
import formatToCurrency from '../../middleware/NumberToVND'
export default function ViewOrderModal() {
    const {
        orderState:{order},showView,
        setShowView,setShowDelete,setShowUpdate,updateOrder
    } = useContext(PayContext);
    const handleDelete =()=>{
        setShowDelete({show:true,idOrder:order._id})
        handleClose()
    }
    const handleUpdate =()=>{
        setShowUpdate({show:true,idOrder:order._id})
        handleClose()
    }
    const checkOrder=async (updateForm)=>{
        await updateOrder(updateForm)
        handleClose()
    }
    const handleClose = () =>{
        setShowView(false);
    }
    const sumMoney=()=>{
        let sum=0
        order.cart.forEach(c=>{
            sum+=c.product.costCar*c.quantity
        })
        return sum
    }
    return (
        <div>
            <Form>
                <Modal
                    size="xl"
                    show={showView}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header>
                        <Modal.Title className="w-100 d-flex justify-content-between align-items-center " id="example-modal-sizes-title-lg">
                            <div>
                                <i className="fas fa-info-circle" style={{color: '#0091FF'}}></i>
                                Thông tin khách hàng
                            </div>
                            <div >
                                <a href={`tel:${order.numberPhone}`} style={{marginRight: '5px'}}>
                                    <Button variant="outline-primary" >Gọi ngay</Button>
                                </a>
                                {order.check===false&&<Button onClick={()=>checkOrder({...order,check:true})} style={{marginRight: '5px'}} variant="outline-warning" >Xác thực</Button>}
                                <Button onClick={handleUpdate} style={{marginRight: '5px'}} variant="outline-success" >Chỉnh sửa ngay</Button>
                                <Button onClick={handleDelete} style={{marginRight: '5px'}} variant="outline-danger">Xoá</Button>
                                <Button onClick={handleClose} variant="outline-dark" >Quay lại</Button>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} lg={4}>
                                <div>Khách hàng: {order.lastName+ " "+order.firstName}</div>
                                <div>Số điện thoại: {order.numberPhone}</div>
                                {order.company&&<div>Công ty: {order.company}</div>}
                                <div>Thành phố: {order.city}</div>
                                <div>Quốc gia: {order.nation}</div>
                                <div>Email: {order.email}</div>
                                <div>Địa chỉ: {order.address}</div>
                                {order.codeZip&&<div>Mã bưu điện: {order.codeZip}</div>}
                                {order.note&&<div>Ghi chú: {order.note}</div>}
                            </Col>
                            <Col xs={12} lg={8}>
                                <div style={{fontSize:'18px',fontWeight:'bold'}}>Thông tin mua hàng</div>
                                <Row>
                                    <Col>Sản phẩm</Col>
                                    <Col>Tổng số lượng</Col>
                                    <Col>Thành tiền</Col>
                                </Row>
                                {
                                    order.cart.map(c=>(
                                        <Row>
                                            <Col>{c.product.nameCar}</Col>
                                            <Col>{c.quantity}</Col>
                                            <Col>{formatToCurrency(c.product.costCar*c.quantity)}<sup>₫</sup></Col>
                                        </Row>
                                    ))
                                }
                                <hr />
                                <Row>
                                    <Col xs={8}>Tổng phụ</Col>
                                    <Col xs={4}>{formatToCurrency(sumMoney())}<sup>₫</sup></Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs={8}>Tổng</Col>
                                    <Col xs={4}>{formatToCurrency(sumMoney())}<sup>₫</sup></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Form>
        </div>
    )
}
