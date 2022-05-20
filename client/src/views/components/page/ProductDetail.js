import React, {useState,useContext} from 'react'
import { Container,Card,Button,Row,Col,Spinner,Modal,Image,Nav,Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Comment from '../../../components/comment/Comment';
import DescriptionCar from '../../../components/description/DescriptionCar';
import parse from 'html-react-parser';
import {CartContext} from '../../../contexts/CartContext'
export default function ProductDetail({products,productsLoading}) {
    const {slug}=useParams();
    const [show,setShow]=useState(false);
    const handleClose=()=>setShow(false);
    const {addToCart,setShowCart} = useContext(CartContext);
    if(productsLoading){
        return (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant='info' />
            </div>
        )
    }
    const productSlug=products.find(product=>product.slug===slug);
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handeBuy=()=>{
        addToCart(productSlug._id)
    }
    const categoryView=()=>{
        
        if(productSlug.category==="graphics"){
            return "Ấn phẩm truyền thông"
        }
        if(productSlug.category==="logo"){
            return "Nhận diện thương hiệu"
        }
        if(productSlug.category==="print"){
            return "In ấn"
        }
        if(productSlug.category==="font"){
            return "Font Chữ"
        }
       
    }
    return (
        <Container style={{padding:'36px 0'}}>
            <div>
                <Card border="light" style={{ width: '100%' }}>
                    <Row>
                        <Col xs="12" md="7">
                            <Card.Img onClick={()=>setShow(true)} variant="top" src={productSlug.imgCarUrl} />
                        </Col>
                        <Col xs="12" md="5">
                            <Card.Body>
                                <Card.Title>{productSlug.nameCar}</Card.Title>
                                <Card.Text>
                                    {parse(productSlug.specicalCar)}
                                </Card.Text>
                                <Card.Text style={{fontSize:'20px'}}>
                                    Danh mục : <strong>{categoryView()}</strong>
                                </Card.Text>
                                <div style={{color:'red'}} className="d-flex justify-content-between">
                                    {formatToCurrency(productSlug.costCar)}₫
                                    <Button variant="danger" onClick={handeBuy}>ĐẶT HÀNG</Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <Modal show={show} onHide={handleClose}  size="lg" >
                    <Image style={{borderRadius:"5em"}} src={productSlug.imgCarUrl}></Image>
                </Modal>
            </div>
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Nav variant="tabs" style={{backgroundColor:'#F2F2F2'}} >
                            <Nav.Item style={{padding:'0 4px'}}>
                                <Nav.Link eventKey="first">Mô tả</Nav.Link>
                            </Nav.Item>
                            <Nav.Item style={{padding:'0 4px'}}>
                                <Nav.Link eventKey="second">Đánh giá</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <DescriptionCar product={productSlug} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Comment />
                            </Tab.Pane>
                        </Tab.Content>
                </Tab.Container>
            </div>

        </Container>
    )
}
