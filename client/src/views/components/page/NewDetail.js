import React ,{useContext} from 'react'
import {Container,Row,Col, Card,Button} from 'react-bootstrap';
import CardLeft from '../../../components/News/cardleft';
import CardLH from '../../../components/News/cardlh';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import {CartContext} from '../../../contexts/CartContext'

export default function NewDetail({news}) {
    const {addToCart,setShowCart} = useContext(CartContext);
   const {id} = useParams()
   const NewId=news.find(n=>n._id===id)
   function taskDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
        

    return [year, month, day].join('-');
    }
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handeBuy=()=>{
        addToCart(NewId._id,"News")
        setShowCart(true)
    }

    return (
        <Container style={{padding:'36px 0'}}>
            <Row>
                <Col md={8} style={{ textAlign: "center" }}>
                    <h2 
                    className="mb-2"
                    >
                        Thông tin Logo</h2>
                    <hr style={{borderBottom:'4px solid',width:'25%',color:'rgb(255, 11, 11)'}}/>

                    <Card className="mt-5 container" style={{border:0}}>
                        
                        <Card.Img variant="top" src={NewId.imageNewUrl} />
                        <Card.Body>

                        <h4>{NewId.titleNew}</h4>
                        <p>Ngày tạo : {taskDate(NewId.createdAt)}</p>
                        <p>Kích thước file : {NewId.logoSize}</p>
                        <p>Loại Logo : {NewId.logoType}</p>
                        <p style={{color: 'red'}}>Giá : {formatToCurrency(NewId.costCar)}đ</p>
                        <Button variant="danger" onClick={handeBuy}>ĐẶT HÀNG</Button>
                        <Card.Text> 
                        Mô tả : {parse(NewId.contentNew)}
                        </Card.Text>
                        
                        
                        
                        </Card.Body>
                    </Card>

                </Col>
                <Col md={4}>    
                    <CardLH title="HỖ TRỢ TRỰC TUYẾN" 
                        content="Hotline Đặt Hàng 0815554111" />
                   
                   
                </Col>
            </Row>
        </Container>
        
    )
}
