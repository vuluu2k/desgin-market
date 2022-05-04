import React,{
    useContext,useEffect
} from 'react'
import {Tab,Row,Col,Nav,Table,Button} from 'react-bootstrap'
import {PayContext} from '../../../contexts/PayContext'
import ViewOrderModal from '../../../components/modal/ViewOrderModal'
import UpdateOrderModal from '../../../components/modal/UpdateOrderModal'
import ConfirmModal from '../../../components/modal/ConfirmModal'
export default function AdminPay() {
    const {
        orderState:{orders,orderLoading},
        getOrder,setShowView,setShowUpdate,
        getOrderDetail,showDelete:{show,idOrder},setShowDelete,
        deleteOrder,updateOrder
    }= useContext(PayContext)
    useEffect(()=>{
        getOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[orders]
    )
    const handleDelOrder = ()=>{
        deleteOrder(idOrder);
        handleClose();
    }
    const handleClose =() =>setShowDelete({show:false,idOrder:null});
    const choseOrderUpdate= (id)=>{
        getOrderDetail(id)
        setShowUpdate(true)
    }
    const choseOrderView =(id)=>{
        getOrderDetail(id)
        setShowView(true)
        setShowUpdate(false)
    }
    const checkOrder=async (updateForm)=>{
        await updateOrder(updateForm)
    }
    const orderSpending=orders.filter(order => {return order.check===false})
    const orderConfirm=orders.filter(order =>{return order.check===true})
    return (
        <div className="container">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col xs={12}>
                    <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Đã xác thực thanh toán</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Chờ xác thực thanh toán</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col xs={12}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Table className="mt-2" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>STT</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Hình thức</th>
                                    <th>Thành phố</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderConfirm.map((order,index)=>(
                                            <tr key={order._id}>
                                                <td>{index+1}</td>
                                                <td>{order.lastName +" "+ order.firstName}</td>
                                                <td>{order.numberPhone}</td>
                                                <td>{order.pay==="payOnline" ? "Thanh toán online":"Thanh toán tại cửa hàng"}</td>
                                                <td>{order.city}</td>
                                                <td className="d-flex justify-content-center">
                                                    <a href={`tel:${order.numberPhone}`}>
                                                        <Button variant="outline-primary" size="sm" ><i className="fas fa-phone"></i></Button>
                                                    </a>
                                                    <Button onClick={()=>choseOrderView(order._id)} variant="outline-success" size="sm"><i className="far fa-eye"></i></Button>
                                                    <Button onClick={()=>choseOrderUpdate(order._id)} variant="outline-info" size="sm"><i className="fas fa-pencil-alt"></i></Button>
                                                    <Button onClick={()=>setShowDelete({show:true,idOrder:order._id})} variant="outline-danger"size="sm" ><i className="fas fa-trash-alt"></i></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Table className="mt-2" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>STT</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Hình thức</th>
                                    <th>Thành phố</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderSpending.map((order,index)=>(
                                            <tr key={order._id}>
                                                <td>{index+1}</td>
                                                <td>{order.lastName +" "+ order.firstName}</td>
                                                <td>{order.numberPhone}</td>
                                                <td>{order.pay==="payOnline" ? "Thanh toán online":"Thanh toán tại cửa hàng"}</td>
                                                <td>{order.city}</td>
                                                <td className="d-flex justify-content-center">
                                                    <a href={`tel:${order.numberPhone}`}>
                                                        <Button variant="outline-primary" size="sm" ><i className="fas fa-phone"></i></Button>
                                                    </a>
                                                    <Button onClick={()=>choseOrderView(order._id)} variant="outline-success" size="sm"><i className="far fa-eye"></i></Button>
                                                    <Button onClick={()=>choseOrderUpdate(order._id)} variant="outline-info" size="sm"><i className="fas fa-pencil-alt"></i></Button>
                                                    <Button onClick={()=>checkOrder({...order,check:true})} variant="outline-warning" size="sm"><i className="fas fa-check"></i></Button>
                                                    <Button onClick={()=>setShowDelete({show:true,idOrder:order._id})} variant="outline-danger"size="sm" ><i className="fas fa-trash-alt"></i></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
           <ConfirmModal title="Xác nhận" content="Bạn chắc chắn muốn xoá" show={show} onClick={()=>handleDelOrder()} onClose={handleClose} />
            {orderLoading===false&&<ViewOrderModal/>}
            {orderLoading===false&&<UpdateOrderModal/>}
            
        </div>
    )
}
