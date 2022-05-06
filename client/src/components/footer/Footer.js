import React from 'react'
import {Row,Col,Container} from 'react-bootstrap';
import FooterCarousel from '../carousel/FooterCarousel';
import {Link} from 'react-router-dom';
import './Style.css'
import Map from '../map/Map';

export default function Footer({products,image}) {
    return (
        <>
            <Container fluid  className="text-white bg-dark"> 
                <Container>
                    <Row style={{padding:'36px 0'}}>
                        <Col md={5}>
                            <div style={{width:'100%'}}>
                                <div style={{fontSize:'19.2px'}}>Thông tin liên hệ</div>
                                <div style={{borderBottom: '3px solid white',width:'40%',margin:'8px 0'}}></div>
                                <p className='mt-12'>
                                    <strong>DESIGN MARKET</strong>
                                    <br/>
                                    <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/11.png" alt="" width="15" height="22"/> Đại học công Nghiệp Hà Nội- Bắc Từ Liêm- Hà Nội
                                    <br/>
                                    <i className="fa-solid fa-phone" style={{color:"White"}}></i>
                                    <a href="tel:0379218450" className="font-link"> 0379218450</a>
                                    <br/>
                                    <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/14.png" alt="" width="17" height="12"/>
                                    <span>
                                        <a href="mailto:laptrinhvn2s@gmail.com" className="font-link"> duongthuytien025@gmail.com</a>    
                                    </span>
                                    <br/>
                                    <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/15.png" alt="" width="17" height="21"/> <a href="https://www.marketdesignco.com/">https://designmarket2k.netlify.app/home</a>
                                </p>
                                
         
                            </div>
                        </Col>
                        <Col md={2}>
                            <div style={{fontSize:'19.2px'}}>Mạng xã hội</div>
                            <div style={{borderBottom: '3px solid white',width:'40%',margin:'8px 0'}}></div>
                            <p className='mt-12'>
                                    
                                    <a style={{color: 'white'}} href="https://www.facebook.com/duongthuytien.025"><i className="fab fa-facebook" style={{paddingRight: '10px'}}></i>FaceBook</a> 
                                    <br/>
                                    <br/>
                                    <a style={{color: 'white'}} href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-th%E1%BB%A7y-ti%C3%AAn-undefined-615a91239/"><i className="fab fa-linkedin" style={{paddingRight: '10px'}}></i>LinkedIn</a> 
                                    <br/>
                                    <br/>
                                    <a style={{color: 'white'}} href="mailto:duongthuytien025@gmail.com"><i className="fas fa-envelope" style={{paddingRight: '10px'}}></i>Gmail</a> 
                                    <br/>
                                    <br/>
                                    <a style={{color: 'white'}} href="https://www.instagram.com/tienbambi94_/"><i className=" fab fa-instagram" style={{paddingRight: '10px'}}></i>Instagram</a> 
                                    <br/>
                                </p>
                        </Col >
                        
                        <Col md={5}>
                            <div>
                                <div style={{fontSize:'19.2px'}}>Bản đồ</div>
                                <div style={{borderBottom: '3px solid white',width:'40%',margin:'8px 0'}}></div>
                                <div className=".map-responsive">
                                    <Map height="30vh"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <div style={{height:'40px',backgroundColor:'#9796f0'}} className="d-flex justify-content-center align-items-center">
                <div className="font-weight-boler text-white">
                    Copyright &copy; Dương Thuỷ Tiên - Imformation Technology Of HaUi
                </div>
            </div>
        </>
    )
}
