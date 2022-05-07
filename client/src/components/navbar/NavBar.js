import React,{useContext} from 'react'
import {Navbar,Nav,NavDropdown,Form, FormControl,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Style.css';
import { ProductContext } from '../../contexts/ProductContext';

export default function NavBar({products,news}) {

    const {getProduct}=useContext(ProductContext)

    return (
        <Navbar style={{zIndex:'1'}} bg="dark" expand="lg" variant="dark" className="shadow" sticky="top" >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link to="/home" as={Link} className="font-custom" active >Trang chủ</Nav.Link>
                        <Nav.Link to="/introduce" as={Link} className="font-custom"></Nav.Link>
                        <Nav.Link to="/products/publications" as={Link} className="font-custom">ấn phẩm truyền thÔng </Nav.Link>
                        <Nav.Link to="/products/trademark" as={Link} className="font-custom">nhận diện thương hiệu</Nav.Link>
                        <Nav.Link to="/products/print" as={Link} className="font-custom">in ấn</Nav.Link>
                        <Nav.Link to="/products/font" as={Link} className="font-custom">font chữ</Nav.Link>
                        <Nav.Link to="/contact" as={Link} className="font-custom">Liên hệ</Nav.Link>
                    </Nav>
                    <Form inline>
                        <div className="w-100 d-flex justify-content-center">
                            <FormControl type="text" placeholder="Tìm kiếm..." onChange={e=>getProduct(e.target.value)} className="mr-sm-2" size="sm"/>    
                            <Button variant="outline-success" className="font-custom" size="sm"><i className="fas fa-search" ></i></Button>  
                        </div>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
