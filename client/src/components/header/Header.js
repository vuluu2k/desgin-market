import React from 'react'
import NavBar from '../navbar/NavBar';
import {Container} from 'react-bootstrap'
import './Style.css';

export default function Header({products}) {
    return (
        <div className="bg-dark">
            <div className="topBar">
                <Container className="d-flex justify-content-between align-items-center w-100">
                    <div className="SubTitle">Design Market- dịch vụ thiết kế đồ họa tốt nhất</div>
                    <div className="IconClass">
                        <div className="d-flex justify-content-between align-items-center">
                            <a className="icon_link" href="https://www.facebook.com/duongthuytien.025"><i className="fab fa-facebook"></i></a>
                            <a className="icon_link" href="mailto:duongthuytien025@gmail.com"><i className="fas fa-envelope"></i></a>
                            <a className="icon_link" href="https://www.linkedin.com/in/d%C6%B0%C6%A1ng-th%E1%BB%A7y-ti%C3%AAn-undefined-615a91239/"><i className="fab fa-linkedin"></i></a>
                            <a className="icon_link" href="https://www.instagram.com/tienbambi94_/"><i className=" fab fa-instagram"></i></a>
                        </div>
                    </div>

                </Container>
            </div>
            <div>
                <Container className="d-flex justify-content-between align-items-center centerBar w-100">
                    <div>
                        <img src="https://res.cloudinary.com/dtmlbvagx/image/upload/v1651896217/design/LOGO_WEB-01_ky1xii.png" alt="Logo Design Market" height="85"/>
                    </div>
                </Container>
            </div>
            <NavBar products={products} />
        </div>            
    )
}
